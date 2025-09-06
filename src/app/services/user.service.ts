// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface UserProfile {
  username: string;
  email: string;
  enabled: boolean;
  projectCount: number;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/api/users`;

  constructor(private http: HttpClient) {}

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
  }

  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/all`);
  }

  // src/app/services/user.service.ts
updateUserProfile(profileData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/update`, profileData);
}

changePassword(passwordData: { currentPassword: string; newPassword: string; confirmPassword: string; }): Observable<any> {
  return this.http.put(`${this.apiUrl}/change-password`, passwordData);
}
  getUserByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/get-user/${username}`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${username}`);
  }
}
