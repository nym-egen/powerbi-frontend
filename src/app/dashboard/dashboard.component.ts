import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setUserFromToken();
  }

  setUserFromToken(): void {
    const token = this.authService.getToken();
    if (token) {
      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token);

      this.username = decoded?.sub || decoded?.username || '';

      if (decoded?.role) {
        this.role = decoded.role;
      } else if (decoded?.authorities && Array.isArray(decoded.authorities)) {
        this.role = decoded.authorities[0]; // grab first role
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
