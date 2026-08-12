import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  message = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.loading = true;
    this.error = '';
    this.message = '';

    const email = this.resetForm.value.email!;

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.message = 'Password reset link sent to your email';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}