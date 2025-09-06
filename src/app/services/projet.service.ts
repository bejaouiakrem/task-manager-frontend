import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private apiUrl = `${environment.apiBaseUrl}/api/projets`;

  constructor(private http: HttpClient) {}

  createProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, project);
  }

  getUserProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-projects`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getAvailableUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/users/available`);
  }
  
  // Get available users to add (excluding current collaborators and owner)4
getAvailableUsersForProject(projectId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${projectId}/available-users`);
}

// Get current collaborators
getProjectCollaborators(projectId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${projectId}/collaborators`);
}

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${projectId}`, projectData);
  }

  addCollaborator(projectId: number, userId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${projectId}/collaborators/${userId}`, {});
}

removeCollaborator(projectId: number, userId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${projectId}/collaborators/${userId}`);
}
}