import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatButton, MatToolbar, RouterLink, RouterLinkActive, NgbCollapse, NgIf],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    isNavbarCollapsed = true;

    auth: Auth = inject(Auth);
    router: Router = inject(Router);

    logout() {
        this.auth.signOut().then(() => {
            this.router.navigate(['/sign-in']).then();
        });
    }

    get loggedIn() {
        return this.auth.currentUser !== null;
    }

    getUsername() {
        return this.auth.currentUser?.email;
    }
}
