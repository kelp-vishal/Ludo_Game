// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  removeAllListeners() {
    throw new Error('Method not implemented.');
  }
  // socket: Socket;

  // constructor() {
  //   this.socket = io('http://localhost:3000'); //backend URL
  // }
}
