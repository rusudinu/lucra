import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        ReactiveFormsModule,
        RouterLink,
        RouterLinkActive,
        MatIcon,
        MatProgressSpinner,
        MatSelect,
        MatOption,
        MatSlideToggle,
    ],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
    loading: boolean = false;
    signUpForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        name: new FormControl('', Validators.required),
        advisorAccount: new FormControl(false, Validators.required),
    });

    constructor(private authenticationService: AuthenticationService) {}

    signUp() {
        this.loading = true;
        this.authenticationService
            .register(
                this.signUpForm.value.username,
                this.signUpForm.value.password,
                this.signUpForm.value.name,
                this.signUpForm.value.advisorAccount,
            )
            .then(() => {
                this.loading = false;
            });
    }
}
