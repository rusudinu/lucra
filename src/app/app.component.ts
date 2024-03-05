import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { UserLoginComponent } from './user/user-login/user-login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatButton, MatIcon, MatBadge, UserLoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    firestore: Firestore = inject(Firestore);

    constructor() {
        this.init();
    }

    async init() {
        // await setDoc(doc(this.firestore, 'test', 'test'), { test: 'test' });
    }
}
