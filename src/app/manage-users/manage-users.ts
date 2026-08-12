import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsers implements OnInit {
  users: UserProfile[] = [];
  isLoading = true;
  displayedColumns: string[] = ['username', 'email', 'role', 'status', 'projects', 'actions'];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to load users', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

 editUser(username: string): void {
  console.log('Attempting to navigate to edit user:', username);
  this.router.navigate(['/edit-user', username]).then(
    () => console.log('Navigation successful'),
    (error) => console.error('Navigation failed:', error)
  );
}

  deleteUser(user: UserProfile): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.userService.deleteUser(user.username).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadUsers(); 
        },
        error: (err) => {
          this.snackBar.open('Failed to delete user', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getStatusClass(enabled: boolean): string {
    return enabled ? 'active-status' : 'inactive-status';
  }

  getStatusText(enabled: boolean): string {
    return enabled ? 'Active' : 'Inactive';
  }
}