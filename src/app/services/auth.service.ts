// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, tap, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthenticationResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: string;
  username: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiBaseUrl}/api/auth`;

  // Add auth state tracking
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();
  private _username = new BehaviorSubject<string | null>(null);
  username$ = this._username.asObservable();

  constructor() {
    this.checkAuthStatus();
  }


  // Your existing signup method
  signup(payload: { username: string; email: string; password: string }) {
    return this.http
      .post<{ message?: string; error?: string }>(
        `${this.apiUrl}/signup`,
        payload
      )
      .pipe(
        catchError((error) => {
          console.error('Signup error:', error);
          let errorMsg = 'Registration failed. Please try again.';

          if (error.error?.error) {
            errorMsg = error.error.error;
          } else if (error.status === 0) {
            errorMsg = 'Network error. Please check your connection.';
          }

          return throwError(() => new Error(errorMsg));
        })
      );
  }

  // New login method
 login(credentials: LoginRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.storeAuthData(response);
          this._isLoggedIn.next(true);
          this._username.next(response.username);
          this.router.navigate(['/home']); 
        }),
        catchError((error) => {
          let errorMsg = 'Login failed';
          if (error.error?.message) {
            errorMsg = error.error.message;
          } else if (error.status === 0) {
            errorMsg = 'Network error - please check your connection';
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  private storeAuthData(authData: AuthenticationResponse) {
    localStorage.setItem('authToken', authData.authenticationToken);
    localStorage.setItem('refreshToken', authData.refreshToken);
    localStorage.setItem('expiresAt', authData.expiresAt);
    localStorage.setItem('username', authData.username);
    if (authData.role) {
      localStorage.setItem('role', authData.role);
    } else {
      localStorage.removeItem('role');
    }
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const expiresAt = localStorage.getItem('expiresAt');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (token && expiresAt) {
      const isExpired = new Date(expiresAt) < new Date();
      this._isLoggedIn.next(!isExpired);
      if (!isExpired && username) {
        this._username.next(username);
      }
      
    }
  }

  logout() {
    localStorage.clear();
    this._isLoggedIn.next(false);
    this._username.next(null);
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // New methods for password reset
  requestPasswordReset(email: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/forgot-password`,
      { email }
    ).pipe(
      catchError(error => {
        const errorMsg = error.error?.message || 'Failed to send reset link';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/reset-password/${token}`,
      { newPassword }
    ).pipe(
      catchError(error => {
        const errorMsg = error.error?.message || 'Failed to reset password';
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
