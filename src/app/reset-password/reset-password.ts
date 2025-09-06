// src/app/auth/reset-password/reset-password.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {
  resetForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  token: string;
  message = '';
  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.token) return;

    this.loading = true;
    this.error = '';
    this.message = '';

    const newPassword = this.resetForm.value.newPassword!;

    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.message = 'Password successfully reset. You can now login.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}