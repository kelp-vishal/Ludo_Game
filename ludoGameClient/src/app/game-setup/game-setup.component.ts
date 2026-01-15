import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css'],
})

export class GameSetupComponent {

  constructor(
    private gameService: GameService, 
    public router: Router
  ) {}
  
  startGame(playerCount: number) {
    this.gameService.startGame(playerCount);
    // this.router.navigate(['/ludo-board']);
    this.router.navigateByUrl('ludo-board');
  }

}


