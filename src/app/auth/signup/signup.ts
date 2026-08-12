// src/app/auth/signup/signup.ts
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../header/header';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    
    ReactiveFormsModule, 
    RouterLink,
    CommonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue])
  });

  isLoading = false;
  errorMessage: string | null = null;

  async onSubmit() {
    if (this.signupForm.invalid || !this.passwordsMatch) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const { name, email, password } = this.signupForm.value;
      await this.authService.signup({
        username: name!,
        email: email!,
        password: password!
      }).subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            state: { registrationSuccess: true }
          });
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred';
      this.isLoading = false;
    }
  }

  get passwordsMatch(): boolean {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }

  // Template accessors
  get name() { return this.signupForm.controls.name; }
  get email() { return this.signupForm.controls.email; }
  get password() { return this.signupForm.controls.password; }
  get confirmPassword() { return this.signupForm.controls.confirmPassword; }
  get agreeTerms() { return this.signupForm.controls.agreeTerms; }
}