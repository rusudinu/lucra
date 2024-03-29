import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthenticationService } from '../common/authentication.service';

@Component({
    selector: 'app-user-login',
    standalone: true,
    imports: [
        MatFormField,
        MatButton,
        ReactiveFormsModule,
        MatInput,
        NgIf,
        MatLabel,
        MatError,
        RouterLink,
        RouterLinkActive,
        MatProgressSpinner,
    ],
    templateUrl: './user-login.component.html',
    styleUrl: './user-login.component.scss',
})
export class UserLoginComponent {
    loading: boolean = false;
    signInForm: FormGroup = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
    });

    constructor(private authenticationService: AuthenticationService) {}

    signIn() {
        this.loading = true;
        this.authenticationService.signIn(this.signInForm.value.username, this.signInForm.value.password).then(() => {
            this.loading = false;
        });
    }
}
