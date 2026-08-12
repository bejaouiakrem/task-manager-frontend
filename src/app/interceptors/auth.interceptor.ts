import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url.split('?')[0]; 

    const isAuthRequest =
      url.endsWith('/login') ||
      
      url.endsWith('/signup') ||

      url.includes('reset-password') ||

      url.includes('accountVerification') ;

    if (isAuthRequest) {
      return next.handle(request); 
    }

   const token = this.authService.getAuthToken();

    const authReq = token
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : request;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
