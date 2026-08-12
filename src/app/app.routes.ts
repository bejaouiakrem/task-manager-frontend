import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { DashboardComponent } from './dashboard/dashboard';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Profile } from './profile/profile';
import { ManageUsers } from './manage-users/manage-users';
import { EditUserComponent } from './edit-user/edit-user';
import { ManageProject } from './manage-project/manage-project';
import { ManageTask } from './manage-task/manage-task';

export const routes: Routes = [
  // Specific routes first
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: 'auth/verify/:token',
    loadComponent: () =>
      import('./auth/signup/verification.component').then(
        (m) => m.VerificationComponent
      ),
  },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'forgot-password', component: ForgotPassword },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./reset-password/reset-password').then((m) => m.ResetPassword),
  },
  { path: 'profile', component: Profile },
  { path: 'manage-users', component: ManageUsers },
  { path: 'edit-user/:username', component: EditUserComponent },
  { path: 'manage-project', component: ManageProject },
  { path: 'manage-task/:id', component: ManageTask },

  // Default routes last
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
