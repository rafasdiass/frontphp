import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método para verificar se o usuário está autenticado
  public isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
