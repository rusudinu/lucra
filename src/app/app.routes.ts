import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { InvestmentCalculatorComponent } from './dashboard/investment-calculator/investment-calculator.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['/sign-in']);

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        component: UserLoginComponent,
    },
    {
        path: 'sign-up',
        component: UserRegisterComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'add-expense',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'add-income',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'investments-calculator',
        component: InvestmentCalculatorComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'reports',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'pending-requests',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'previous-requests',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLanding },
    },
];
