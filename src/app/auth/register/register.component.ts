import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  register() {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Username and password are required.';
      this.success = '';
      return;
    }
    const user = {
      username: this.username,
      password: this.password
    };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/register', user)
      .subscribe({
        next: () => {
          this.success = 'Registration successful! You can now log in.';
          this.error = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.error = err.error?.error || 'Registration failed';
          this.success = '';
        }
      });
  }
}
