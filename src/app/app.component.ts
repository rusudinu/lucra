import { Component, inject, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAppState } from './common/interface/app-state.interface';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SetUserDataAction } from './user/store/user.actions';
import { UserLoginComponent } from './user/user-login/user-login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatButton, MatIcon, MatBadge, UserLoginComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    firestore: Firestore = inject(Firestore);
    auth = getAuth();
    store: Store<IAppState> = inject(Store);

    ngOnInit() {
        onAuthStateChanged(this.auth, user => {
            if (user) {
                this.getUserData(user.uid).then(userData => {
                    const userDataAsIUser = {
                        email: userData?.['email'],
                        uid: userData?.['uid'],
                        name: userData?.['name'],
                        advisorAccount: userData?.['advisorAccount'],
                    };
                    this.store.dispatch(SetUserDataAction({ user: userDataAsIUser }));
                });
            }
        });
    }

    getUserData(userId: string) {
        const userRef = doc(this.firestore, 'users', userId);
        return getDoc(userRef).then(doc => {
            if (doc.exists()) {
                return doc.data();
            }
            return null;
        });
    }
}
