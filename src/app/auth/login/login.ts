import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../header/header';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface LoginFormValues {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    
    ReactiveFormsModule, 
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', { 
      validators: [Validators.required],
      nonNullable: true // Ensures value is never null
    }),
    password: new FormControl('', { 
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true // Ensures value is never null
    })
  });

  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
  if (this.loginForm.invalid) return;

  this.loading = true;
  this.errorMessage = '';

  const formValues = this.loginForm.getRawValue() as LoginFormValues;

  this.authService.login(formValues).subscribe({
    next: () => {
      this.router.navigate(['/dashboard']); 
    },
    error: (err) => {
      this.errorMessage = err.message;
      this.loading = false;
    }
  });
}
}