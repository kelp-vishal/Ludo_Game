import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'app-web-socket-connectivity',
  imports: [],
  templateUrl: './web-socket-connectivity.component.html',
  styleUrl: './web-socket-connectivity.component.css'
})
export class WebSocketConnectivityComponent {
  socket: Socket;

  constructor() { 
    this.socket=io('http://localhost:3002');
  }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server'); 
    });
  }
      
}  

  


