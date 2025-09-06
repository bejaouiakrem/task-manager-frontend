import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  isLoading = true;
  profile: any = null;
  editableProfile: any = {};
  isEditing = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getCurrentUserProfile().subscribe({
      next: (response) => {
        this.profile = response;
        this.editableProfile = { ...response };
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile information';
        this.snackBar.open(this.error, 'Close', { duration: 3000 });
        this.isLoading = false;
        if (err.status === 401) {
          this.authService.logout();
        }
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    // Reset editable profile when canceling edit
    if (!this.isEditing) {
      this.editableProfile = { ...this.profile };
    }
  }

  saveProfile(): void {
    this.isLoading = true;
    this.userService.updateUserProfile(this.editableProfile).subscribe({
      next: (updatedProfile) => {
        this.profile = updatedProfile;
        this.isEditing = false;
        this.isLoading = false;
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          'Failed to update profile: ' + err.message,
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      },
    });
  }
}
