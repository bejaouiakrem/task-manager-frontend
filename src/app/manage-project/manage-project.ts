import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProjetService } from '../services/projet.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InitialsPipe } from '../pipes/initials.pipe';
import { UserSearchPipe } from '../pipes/UserSearchPipe.pipe';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    InitialsPipe,
  ],
  templateUrl: './manage-project.html',
  styleUrls: ['./manage-project.css'],
})
export class ManageProject implements OnInit {
  projects: any[] = [];
  categories: any[] = [];
  users: any[] = [];
  showCreateForm = false;
  canCreateProjects = false;
  isLoading = false;
  errorMessage = '';
  currentUsername = '';

  availableUsersToAdd: any[] = [];
  currentCollaborators: any[] = [];
  filteredAvailableUsers: any[] = [];
  filteredCurrentCollaborators: any[] = [];

  projectForm: FormGroup;
  showEditForm = false;
  currentEditProjectId: number | null = null;
  editProjectForm: FormGroup;

  constructor(
    private projetService: ProjetService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
      categorieId: [null, Validators.required],
      collaboratorIds: [[]],
    });
    this.editProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
      categorieId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentUsername = this.authService.getAuthToken()
      ? localStorage.getItem('username') || ''
      : '';

    this.canCreateProjects =
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'PROJECT_MANAGER';

    this.loadProjects();
    this.loadCategories();

    if (this.canCreateProjects) {
      this.loadAvailableUsers();
    }
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projetService.getUserProjects().subscribe({
      next: (data) => {
        this.projects = data.map((project) => ({
          ...project,
          owner: project.owner || { username: 'Unknown' },
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects', err);
        this.errorMessage = 'Failed to load projects';
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.projetService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error loading categories', err),
    });
  }

  loadAvailableUsers(): void {
    this.projetService.getAvailableUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error loading users', err),
    });
  }

  createProject(): void {
    if (this.projectForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.isLoading = true;
    const currentUsername = localStorage.getItem('username');

    this.projetService
      .createProject({
        ...this.projectForm.value,
        ownerUsername: currentUsername,
      })
      .subscribe({
        next: (project) => {
          this.showCreateForm = false;
          this.projectForm.reset();
          this.loadProjects();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error creating project', err);
          this.errorMessage = err.error?.error || 'Failed to create project';
          this.isLoading = false;
        },
      });
  }

  private markFormAsTouched(): void {
    Object.values(this.projectForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  getProjectColor(projectId: number): string {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFBE0B',
      '#FB5607',
      '#8338EC',
      '#3A86FF',
      '#44AF69',
      '#F86624',
      '#662E9B',
    ];
    return colors[projectId % colors.length];
  }

  toggleCollaborator(userId: number): void {
    const currentIds = this.projectForm.get('collaboratorIds')?.value || [];
    const index = currentIds.indexOf(userId);

    if (index > -1) {
      currentIds.splice(index, 1);
    } else {
      currentIds.push(userId);
    }

    this.projectForm.get('collaboratorIds')?.setValue([...currentIds]);
  }

  isCollaboratorSelected(userId: number): boolean {
    const currentIds = this.projectForm.get('collaboratorIds')?.value || [];
    return currentIds.includes(userId);
  }

  editCollaboratorSearch = '';
  editCollaboratorIds: number[] = [];
  currentCollaboratorSearch = '';

 editProject(project: any): void {
  this.showEditForm = true;
  this.currentEditProjectId = project.id_projet;
  
  // Reset search
  this.editCollaboratorSearch = '';
  
  this.editProjectForm.patchValue({
    name: project.name,
    description: project.description,
    categorieId: project.categorie?.id || null,
  });
  
  // Load collaborators and available users
  this.loadProjectCollaborators(project.id_projet);
  this.loadAvailableUsersForProject(project.id_projet);
}
  
  

loadProjectCollaborators(projectId: number): void {
  this.projetService.getProjectCollaborators(projectId).subscribe({
    next: (collaborators) => {
      this.currentCollaborators = collaborators;
      this.editCollaboratorIds = collaborators.map((c: any) => c.id);
      this.filterCollaborators();
    },
    error: (err) => console.error('Error loading collaborators', err)
  });
}

loadAvailableUsersForProject(projectId: number): void {
  this.projetService.getAvailableUsersForProject(projectId).subscribe({
    next: (users) => {
      this.availableUsersToAdd = users;
      this.filterCollaborators();
    },
    error: (err) => console.error('Error loading available users', err)
  });
}

filterCollaborators(): void {
  const searchTerm = this.editCollaboratorSearch.toLowerCase();
  
  // Filter available users
  this.filteredAvailableUsers = this.availableUsersToAdd.filter(u =>
    u.username.toLowerCase().includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm)
  );
  
  // Filter current collaborators
  this.filteredCurrentCollaborators = this.currentCollaborators.filter(u =>
    u.username.toLowerCase().includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm)
  );
}

onSearchChange(): void {
  this.filterCollaborators();
}

// In your ManageProject component
toggleEditCollaborator(user: any, action: 'add' | 'remove'): void {
  if (!this.currentEditProjectId) return;

  if (action === 'add') {
    this.projetService.addCollaborator(this.currentEditProjectId, user.id).subscribe({
      next: () => {
        // Update local state
        this.currentCollaborators.push(user);
        this.availableUsersToAdd = this.availableUsersToAdd.filter(u => u.id !== user.id);
        this.filterCollaborators();
      },
      error: (err) => console.error('Error adding collaborator', err)
    });
  } else {
    this.projetService.removeCollaborator(this.currentEditProjectId, user.id).subscribe({
      next: () => {
        // Update local state
        this.currentCollaborators = this.currentCollaborators.filter(u => u.id !== user.id);
        this.availableUsersToAdd.push(user);
        this.filterCollaborators();
      },
      error: (err) => console.error('Error removing collaborator', err)
    });
  }
}

  isEditCollaboratorSelected(userId: number): boolean {
    return this.editCollaboratorIds.includes(userId);
  }

  updateProject(): void {
    if (this.editProjectForm.invalid || !this.currentEditProjectId) return;

    const updatedData = {
      ...this.editProjectForm.value,
      collaboratorIds: this.editCollaboratorIds,
    };

    this.isLoading = true;
    this.projetService
      .updateProject(this.currentEditProjectId, updatedData)
      .subscribe({
        next: (updatedProject) => {
          this.isLoading = false;
          this.cancelEdit();
          this.loadProjects();
        },
        error: (err) => {
          console.error('Error updating project', err);
          this.errorMessage = 'Failed to update project';
          this.isLoading = false;
        },
      });
  }
  // Users not in the project
  get availableEditCollaborators(): any[] {
    return this.users.filter((u) => !this.editCollaboratorIds.includes(u.id));
  }

  // Users already in the project
  get currentEditCollaborators(): any[] {
    return this.users.filter((u) => this.editCollaboratorIds.includes(u.id));
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.currentEditProjectId = null;
    this.editProjectForm.reset();
  }

  deleteProject(projectId: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projetService.deleteProject(projectId).subscribe({
        next: () => {
          this.loadProjects(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting project', err);
          this.errorMessage = 'Failed to delete project';
        },
      });
    }
  }
  goToProjectTasks(projectId: number) {
    this.router.navigate([`/manage-task/${projectId}`]);
  }

  canEditProject(project: any): boolean {
    const currentUsername = this.currentUsername;
    const role = localStorage.getItem('role');
    return role === 'ADMIN' || project.ownerUsername === currentUsername;
  }
}
