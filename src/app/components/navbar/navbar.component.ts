import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav *ngIf="isAuthenticated">
    <!-- O conteúdo da sua barra de navegação -->
  </nav>
  `
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
