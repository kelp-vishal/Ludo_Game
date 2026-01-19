import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface GameRoom {
  roomId: string;
  players: Array<{socketId: string;playerName?: string; color?: string }>;
  maxPlayers: number;
  currentPlayers: number;
  gameStarted: boolean;
  hostSocketId: string;
  createdAt: Date;
}

@WebSocketGateway( {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private rooms: Map<string, GameRoom> = new Map();
  private playerRooms: Map<string, string> = new Map(); // socketId= roomId

  private roomColorIndex: Map<String ,number>=new Map();
  private colors = ['RED', 'GREEN', 'BLUE', 'YELLOW'];
  // private colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];

  handleConnection(client: Socket) {
    console.log('New user Connected:', client.id);
    this.server.emit('user-joined', {
      Message: `New user Joined: ${client.id}`,
      socketId: client.id
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User Disconnected:', client.id);

    // Remove player from their room
    const roomId = this.playerRooms.get(client.id);
    if (roomId) {
      const room = this.rooms.get(roomId);
      if (room) {
        room.players = room.players.filter(p => p.socketId !== client.id);
        room.currentPlayers--;

        if (room.currentPlayers === 0) {
          this.rooms.delete(roomId);
        } else {
          this.server.to(roomId).emit('player-left', {
            roomId,
            room,
            message: `Player ${client.id} left the room`,
            socketId: client.id
          });
        }
      }
      this.playerRooms.delete(client.id);
    }

    this.server.emit('user-left', {
      Message: `User left: ${client.id}`,
      socketId: client.id
    });
  }

  @SubscribeMessage('create-room')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { playerCount: number;playerName: string;socketId:string }
  ) {

    console.log(' vishal visshal')
    const roomId = this.generateRoomId();
    const room: GameRoom = {
      roomId,
      players: [
        {
          socketId: client.id,
          playerName: data.playerName,
          color: 'RED'
        }
      ],
      maxPlayers: data.playerCount,
      currentPlayers:1,
      gameStarted: false,
      hostSocketId: client.id,
      createdAt: new Date()
    };

    this.rooms.set(roomId, room);
    this.playerRooms.set(client.id, roomId);

    this.roomColorIndex.set(roomId,1);

    client.join(roomId);

    console.log(`Room created: ${roomId} with host ${client.id}`);
    client.emit('room-created', {
      room,
      message: `Room created successfully with ID: ${roomId}`
    });
    
    // Broadcast to all clients about new room
    this.server.emit('rooms-list', {
      rooms: Array.from(this.rooms.values())
    });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {roomId: string;playerName: string; socketId: string }
  ) {
    const room = this.rooms.get(data.roomId);

    if (!room) {
      client.emit('room-error', {
        message: `Room ${data.roomId} not found`
      });
      return;
    }

    if (room.gameStarted) {
      client.emit('room-error', {
        message: 'Game has already started in this room'
      });
      return;
    }

    if (room.currentPlayers >= room.maxPlayers) {
      client.emit('room-error', {
        message: `Room is full. Maximum players: ${room.maxPlayers}`
      });
      return;
    }

    // Check if player is already in a room
    const existingRoom = this.playerRooms.get(client.id);
    if (existingRoom) {
      this.handleLeaveRoom(client, { socketId: client.id });
    }

    // Assign color
    const currentColorIndex = this.roomColorIndex.get(data.roomId) || 0;
    const color = this.colors[currentColorIndex % this.colors.length];
    this.roomColorIndex.set(data.roomId,currentColorIndex+1);

    room.players.push({
      socketId: client.id,
      playerName: data.playerName,
      color
    });
    room.currentPlayers++;

    this.playerRooms.set(client.id, data.roomId);
    client.join(data.roomId);

    console.log(`Player ${client.id} joined room ${data.roomId}`);

    // Notify the joining player
    client.emit('room-joined', {
      room,
      message: `Successfully joined room ${data.roomId}`
    });

    // Notify others in the room
    this.server.to(data.roomId).emit('player-joined', {
      roomId: data.roomId,
      room,
      message: `${data.playerName} (${client.id}) joined the room`,
      socketId: client.id
    });

    // Broadcast updated rooms list
    this.server.emit('rooms-list', {
      rooms: Array.from(this.rooms.values())
    });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { socketId: string }
  ) {
    const roomId = this.playerRooms.get(client.id);

    if (!roomId) {
      client.emit('room-error', {
        message: 'You are not in any room'
      });
      return;
    }

    const room = this.rooms.get(roomId);
    if (room) {
      room.players = room.players.filter(p => p.socketId !== client.id);
      room.currentPlayers--;

      console.log(`Player ${client.id} left room ${roomId}`);

      if (room.currentPlayers === 0) {
        this.rooms.delete(roomId);
        this.roomColorIndex.delete(roomId);
        console.log(`Room ${roomId} deleted (empty)`);
      } else {
        // Transfer host if needed
        if (room.hostSocketId === client.id) {
          room.hostSocketId = room.players[0].socketId;
        }

        this.server.to(roomId).emit('player-left', {
          roomId,
          room,
          message: `Player ${client.id} left the room`,
          socketId: client.id
        });
      }
    }

    client.leave(roomId);
    this.playerRooms.delete(client.id);

    // Broadcast updated rooms list
    this.server.emit('rooms-list', {
      rooms: Array.from(this.rooms.values())
    });
  }

  @SubscribeMessage('get-rooms-list')
  handleGetRoomsList(@ConnectedSocket() client: Socket) {
    const availableRooms = Array.from(this.rooms.values()).filter(
      room => !room.gameStarted && room.currentPlayers < room.maxPlayers
    );

    client.emit('rooms-list', {
      rooms: availableRooms
    });
  }

  @SubscribeMessage('start-game')
  handleStartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { socketId: string }
  ) {
    const roomId = this.playerRooms.get(client.id);

    if (!roomId) {
      client.emit('room-error', {
        message: 'You are not in any room'
      });
      return;
    }

    const room = this.rooms.get(roomId);
    if (!room) {
      client.emit('room-error', {
        message: 'Room not found'
      });
      return;
    }

    // Only host can start the game
    if (room.hostSocketId !== client.id) {
      client.emit('room-error', {
        message: 'Only the room host can start the game'
      });
      return;
    }

    room.gameStarted = true;

    console.log(`Game started in room ${roomId}`);

    // Notify all players in the room
    this.server.to(roomId).emit('game-started', {
      room,
      message: `Game started with ${room.currentPlayers} players`,
      players: room.players
    });

    // Broadcast updated rooms list
    this.server.emit('rooms-list', {
      rooms: Array.from(this.rooms.values())
    });
  }

  @SubscribeMessage('game-state-update')
  handleGameStateUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { socketId: string; gameState: any }
  ) {
    const roomId = this.playerRooms.get(client.id);

    if (!roomId) {
      return;
    }

    // Broadcast game state to all players in the room
    this.server.to(roomId).emit('game-state-update', {
      gameState: data.gameState,
      updatedBy: client.id,
      timestamp: new Date()
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }

  private generateRoomId(): string {
    return `ROOM_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}