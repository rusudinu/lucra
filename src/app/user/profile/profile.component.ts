import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';

import { IAppState } from '../../common/interface/app-state.interface';
import { SetUserDataAction } from '../store/user.actions';
import { selectUser } from '../store/user.selectors';
import { IUser } from '../user.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [MatButton, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatSlideToggle, NgIf, MatProgressSpinner],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    firestore: Firestore = inject(Firestore);
    auth = getAuth();
    store: Store<IAppState> = inject(Store);

    user: IUser | undefined;
    userData$ = this.store.select(selectUser);

    loading: boolean = false;

    userProfileForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        advisorAccount: new FormControl(false, Validators.required),
    });

    updateProfile() {
        this.loading = true;
        updateProfile(this.auth.currentUser!, { displayName: this.userProfileForm.value.name }).then();

        const userRef = doc(this.firestore, 'users', this.user!.uid);

        updateDoc(userRef, {
            name: this.userProfileForm.value.name,
            advisorAccount: this.userProfileForm.value.advisorAccount,
        }).then(() => {
            this.store.dispatch(
                SetUserDataAction({
                    user: {
                        ...this.user!,
                        name: this.userProfileForm.value.name,
                        advisorAccount: this.userProfileForm.value.advisorAccount,
                    },
                }),
            );
            this.loading = false;
        });
    }

    ngOnInit() {
        this.userData$.subscribe(userData => {
            this.user = userData;
            this.userProfileForm.patchValue({
                name: userData?.name,
                advisorAccount: userData?.advisorAccount,
            });
        });
    }
}
