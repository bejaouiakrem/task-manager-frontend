import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, UserProfile } from '../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css'],
})
export class EditUserComponent implements OnInit {
  username: string = '';
  form!: FormGroup;
  user: UserProfile | null = null;
  error: string | null = null;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') ?? '';

    if (!this.username) {
      this.error = 'No username provided';
      this.isLoading = false;
      return;
    }

    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      enabled: [false, Validators.required],
    });
  }

  private loadUserData(): void {
    this.userService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({
          email: user.email,
          role: user.role,
          enabled: user.enabled,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load user';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const updatedData = {
      username: this.username,
      ...this.form.value,
    };

    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
        });
        this.navigateToManageUsers();
      },
      error: (err) => {
        this.error = err.message || 'Failed to update user';
        this.snackBar.open(this.error ?? 'Failed to update user', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.isSubmitting = false;
      },
    });
  }

  navigateToManageUsers(): void {
    this.router.navigate(['/manage-users']);
  }

  cancel(): void {
    if (
      this.form.pristine ||
      confirm('Are you sure you want to discard changes?')
    ) {
      this.navigateToManageUsers();
    }
  }
}
