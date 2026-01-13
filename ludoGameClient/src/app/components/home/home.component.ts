import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

    startGame() {
      try {
        // redirect the user to either login or to the room-connecte-generate page
        console.log("Redirecting for the login or room connection");
        // this.router.navigate(['/login']);
        this.router.navigate(['/room-connect']);

        // check the credentioals for the user , is the user logged in or not
        // if logged in redirect to room-connect-generate page 
      } catch (error) {
        console.error("Error starting the game:", error);
      }
        
    }
}
