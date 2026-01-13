import { Component } from '@angular/core';

@Component({
  selector: 'app-ludo-board',
  templateUrl: './ludo-board.component.html',
  styleUrls: ['./ludo-board.component.css']
})
export class LudoBoardComponent {
  diceValue: number = 0;

  rollDice(): void {
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    console.log('Dice rolled: ' + this.diceValue);
  }

  newGame(): void {
    this.diceValue = 0;
    console.log('New game started');
  }
}
