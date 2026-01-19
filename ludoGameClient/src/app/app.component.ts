import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LudoBoardComponent } from './ludo-board/ludo-board.component';
import { HeaderComponent } from './components/header/header.component';
import { GameSetupComponent } from './game-setup/game-setup.component';

@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = signal('ludoGameClient');
}
