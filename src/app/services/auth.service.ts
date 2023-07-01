import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadToken();
  }

  loadToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.tokenSubject.next(token);
      this.isAuthenticatedSubject.next(this.isAuthenticated());
    }
  }

  getToken(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }

  isAuthenticated(): boolean {
    const token = this.getToken().value;
    if (!token) return false;
    const decoded: any = jwt_decode(token);
    return decoded.exp > Date.now() / 1000;
  }

  subscribeToAuthenticationState(): BehaviorSubject<boolean> {
    return this.isAuthenticatedSubject;
  }

  getUserEmail(): string {
    const token = this.getToken().value;
    if (!token) return '';
    const decoded: any = jwt_decode(token);
    return decoded.email;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
