// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
export interface NewProject {
  id: number;
  name: string;
  description: string;
  ownerUsername: string;
  assignedDate: string;
  totalTasks: number;
  yourTasks: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiBaseUrl}/api/dashboard`;

  constructor(private http: HttpClient) { }

  getNewProjects(): Observable<NewProject[]> {
    return this.http.get<NewProject[]>(`${this.apiUrl}/new-projects`);
  }
}