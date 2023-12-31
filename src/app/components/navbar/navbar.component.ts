import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userEmail: string = '';

  constructor(public authService: AuthService, private router: Router) {
    this.authService.subscribeToAuthenticationState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.userEmail = this.authService.getUserEmail();
    });
  }

  ngOnInit() {
    console.log('NavbarComponent initialized');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

