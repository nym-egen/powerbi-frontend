import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && user.role === 'ROLE_ADMIN') {
      return true;
    }

    this.router.navigate(['/not-authorized']);
    return false;
  }

}
