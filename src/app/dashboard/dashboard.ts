// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { DashboardService, NewProject } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  newProjects: NewProject[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadNewProjects();
  }

  loadNewProjects(): void {
    this.isLoading = true;
    this.dashboardService.getNewProjects().subscribe({
      next: (projects) => {
        this.newProjects = projects;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load new projects';
        this.isLoading = false;
        console.error('Error loading new projects', err);
      }
    });
  }

  getDaysAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  }
}