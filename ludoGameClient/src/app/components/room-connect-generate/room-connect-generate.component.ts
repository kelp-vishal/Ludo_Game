import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-connect-generate',
  imports: [],
  templateUrl: './room-connect-generate.component.html',
  styleUrl: './room-connect-generate.component.css'
})
export class RoomConnectGenerateComponent {
  constructor(private router: Router) {}
  playLocally(){
    this.router.navigateByUrl('game-setup');
  }
}
