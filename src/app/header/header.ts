<<<<<<< HEAD
// Header Component - Dark Corporate Theme
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
=======
// src/app/header/header.component.ts
import { Component, OnInit } from '@angular/core';
>>>>>>> 777dbe163539b26d7bf1b60a2d763ecbdeebd8c7
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { InitialsPipe } from '../pipes/initials.pipe';
=======
>>>>>>> 777dbe163539b26d7bf1b60a2d763ecbdeebd8c7

@Component({
  selector: 'app-header',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterLink, InitialsPipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  isLoggedIn = false;
  username: string | null = null;
  userRole: string | null = null;
  dropdownOpen = false;
=======
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  userRole: string | null = null;
>>>>>>> 777dbe163539b26d7bf1b60a2d763ecbdeebd8c7
  private authSub!: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.username = localStorage.getItem('username');
        this.userRole = localStorage.getItem('role');
      } else {
        this.username = null;
        this.userRole = null;
<<<<<<< HEAD
        this.dropdownOpen = false;
=======
>>>>>>> 777dbe163539b26d7bf1b60a2d763ecbdeebd8c7
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

<<<<<<< HEAD
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  signOut(): void {
    this.authService.logout();
    this.closeDropdown();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.dropdownOpen = false;
    }
  }

  // Close dropdown on escape key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.dropdownOpen = false;
=======
  signOut(): void {
    this.authService.logout();
>>>>>>> 777dbe163539b26d7bf1b60a2d763ecbdeebd8c7
  }
}