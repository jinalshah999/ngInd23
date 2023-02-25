import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = true;
  constructor() {}
  isLoggedIn() {
    return this.loggedIn;
  }
}
