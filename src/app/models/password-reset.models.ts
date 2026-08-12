// src/app/models/password-reset.models.ts
export interface PasswordResetRequest {
  email: string;
}

export interface NewPasswordRequest {
  token: string;
  newPassword: string;
}