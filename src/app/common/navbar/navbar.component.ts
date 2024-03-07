import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { selectUserAdvisorAccount } from '../../user/store/user.selectors';
import { IAppState } from '../interface/app-state.interface';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatButton, MatToolbar, RouterLink, RouterLinkActive, NgbCollapse, NgIf, AsyncPipe],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    isNavbarCollapsed = true;

    auth: Auth = inject(Auth);
    router: Router = inject(Router);
    store: Store<IAppState> = inject(Store);

    advisorAccount$ = this.store.select(selectUserAdvisorAccount);

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
