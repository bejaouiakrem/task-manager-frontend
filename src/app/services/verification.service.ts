// src/app/services/verification.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VerificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/auth`;

  // verification.service.ts
  verifyAccount(token: string) {
    return this.http
      .get<{ message: string }>(
        `${this.apiUrl}/accountVerification/${token}`,
        { responseType: 'json' } 
      )
      .pipe(
        catchError((error) => {
          console.error('Verification error:', error);
          let errorMsg = 'Verification failed';

          
          if (error.error?.message) {
            errorMsg = error.error.message;
          } else if (error.message) {
            errorMsg = error.message;
          } else if (error.status === 0) {
            errorMsg = 'Network error - please check your connection';
          }

          return throwError(() => new Error(errorMsg));
        })
      );
  }

  resendVerification(email: string) {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/resend-verification`, {
        email,
      })
      .pipe(
        catchError((error) => {
          const errorMsg =
            error.error?.message || 'Failed to resend verification email';
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}
