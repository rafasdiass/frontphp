import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Certifique-se de usar o caminho correto para o AuthService

@Component({
  selector: 'app-navbar',
  template: `
  <nav *ngIf="authService.isAuthenticated()">
    <!-- O conteúdo da sua barra de navegação -->
  </nav>
  `
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }

}
