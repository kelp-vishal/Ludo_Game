import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WebSocketConnectivityComponent } from './web-socket-connectivity/web-socket-connectivity.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,WebSocketConnectivityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = signal('ludoGameClient');
}
