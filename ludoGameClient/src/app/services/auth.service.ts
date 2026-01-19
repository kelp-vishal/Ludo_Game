import { Injectable, Signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  // currentUser: Signal<User | null> = null;
  // isAuthenticated: Signal<boolean> = false;
  
}
