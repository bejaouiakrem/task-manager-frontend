// verification.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="verification-container">
      @if (loading) {
        <mat-spinner diameter="50"></mat-spinner>
      } @else {
        <div class="result-message">
          @if (success) {
            <mat-icon class="success-icon">check_circle</mat-icon>
            <h2>Account activated successfully!</h2>
            <button mat-raised-button color="primary" (click)="navigateToLogin()">
              Go to Login
            </button>
          } @else {
            <mat-icon class="error-icon">error</mat-icon>
            <h2>{{ errorMessage }}</h2>
            <button mat-button (click)="navigateToHome()">
              Return Home
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .verification-container {
      max-width: 500px;
      margin: 2rem auto;
      text-align: center;
    }
    .success-icon {
      color: green;
      font-size: 60px;
      height: 60px;
      width: 60px;
    }
    .error-icon {
      color: red;
      font-size: 60px;
      height: 60px;
      width: 60px;
    }
  `]
})
export class VerificationComponent implements OnInit {
  loading = true;
  success = false;
  errorMessage = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private verificationService = inject(VerificationService);

  // verification.component.ts
ngOnInit() {
  const token = this.route.snapshot.paramMap.get('token');
  
  if (!token) {
    this.handleError('Invalid verification link');
    return;
  }

  this.verificationService.verifyAccount(token).subscribe({
    next: (response) => {
      this.loading = false;
      this.success = true;
      console.log('Verification success:', response);
    },
    error: (err) => {
      console.error('Verification error:', err);
      this.handleError(err.message);
      
      
    }
  });
}



  private handleError(message: string) {
    this.loading = false;
    this.errorMessage = message;
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}