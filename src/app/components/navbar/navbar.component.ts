import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getToken().subscribe((token) => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }
}
