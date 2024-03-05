import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: UserLoginComponent },
    { path: 'sign-up', component: UserRegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-expense', component: DashboardComponent },
    { path: 'add-income', component: DashboardComponent },
    { path: 'investments-calculator', component: DashboardComponent },
    { path: 'reports', component: DashboardComponent },
    { path: 'pending-requests', component: DashboardComponent },
    { path: 'previous-requests', component: DashboardComponent },
];
