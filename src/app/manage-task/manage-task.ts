import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-manage-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-task.html',
  styleUrls: ['./manage-task.css']
})
export class ManageTask implements OnInit {

  projectId!: number;
  tasks: any[] = [];
  isLoading = false;
  errorMessage = '';

  // For create
  newTask: any = {
    title: '',
    description: '',
    priority: '',
    status: ''
  };

  // For edit
  isEditing = false;
  editTask: any = {};

  priorities = ['LOW', 'MEDIUM', 'HIGH'];
  statuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  ownerUsername = localStorage.getItem('username');

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasksByProjectId(this.projectId)
      .subscribe({
        next: (data) => {
          this.tasks = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load tasks';
          this.isLoading = false;
        }
      });
  }

  createTask() {
    if (!this.newTask.title || !this.newTask.priority || !this.newTask.status) return;
    const taskToCreate = {
      ...this.newTask,
      projectId: this.projectId,
      ownerUsername: this.ownerUsername
    };
    this.isLoading = true;
    this.taskService.createTask(taskToCreate).subscribe({
      next: () => {
        this.newTask = { title: '', description: '', priority: '', status: '' };
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Failed to create task';
        this.isLoading = false;
      }
    });
  }

  startEdit(task: any) {
    this.isEditing = true;
    this.editTask = { ...task };
  }

  updateTask() {
    if (!this.editTask.title || !this.editTask.priority || !this.editTask.status) return;
    this.isLoading = true;
    this.taskService.updateTask(this.editTask.id_tache, this.editTask).subscribe({
      next: () => {
        this.isEditing = false;
        this.editTask = {};
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Failed to update task';
        this.isLoading = false;
      }
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editTask = {};
  }

  deleteTask(id: number) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.isLoading = true;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => {
        this.errorMessage = 'Failed to delete task';
        this.isLoading = false;
      }
    });
  }
}
