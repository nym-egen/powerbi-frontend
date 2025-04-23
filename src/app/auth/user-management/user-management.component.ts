import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface User {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  roles = ['ROLE_USER', 'ROLE_ADMIN'];
  loading = true;

  newUser = {
    username: '',
    password: '',
    role: ''
  };

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.showError('Failed to fetch users');
        this.loading = false;
      }
    });
  }

  updateRole(user: User, newRole: string) {
    this.http.put(`http://localhost:8080/api/users/${user.username}/role`, {role: newRole}).subscribe({
      next: () => {
        user.role = newRole;
        this.showSuccess(`Updated role for ${user.username}`);
      },
      error: () => {
        this.showError(`Failed to update role for ${user.username}`);
      }
    });
  }

  addUser() {
    const userPayload = {
      username: this.newUser.username,
      password: this.newUser.password,
      role: this.newUser.role
    };

    this.http.post('http://localhost:8080/api/auth/register', userPayload).subscribe({
      next: () => {
        this.showSuccess('User added!');
        this.newUser = {username: '', password: '', role: 'ROLE_USER'};
        this.fetchUsers();
      },
      error: (err) => {
        this.showError(err.error?.error || 'Failed to add user');
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete ${user.username}?`)) return;

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    this.http.delete(`http://localhost:8080/api/users/${user.username}`, {
      headers,
      responseType: 'json'
    }).subscribe({
      next: () => {
        this.showSuccess(`${user.username} deleted successfully`);
        this.users = this.users.filter(u => u.username !== user.username);
      },
      error: () => {
        this.showError(`Failed to delete ${user.username}`);
      }
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
