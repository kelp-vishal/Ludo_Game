import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";

@WebSocketGateway(3002,{
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
    },

})

export class RoomsGateway implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer() server:Server;

    handleConnection(client: Socket) {
        console.log('New user Connected.', client.id);

        this.server.emit('user-joined',{
            Message:`New user Joined the chat: ${client.id}`,
        })
    }

    handleDisconnect(client:Socket) {
        console.log('user Disconnected',client.id); // here the client.id is an socket id itself

        this.server.emit('user-left',{
            Message:` user left the chat: ${client.id}`,
        })
    }

    @SubscribeMessage('newMessage')

    handleNewMessage(@MessageBody() message :String){
        this.server.emit('message',message);
    }


}