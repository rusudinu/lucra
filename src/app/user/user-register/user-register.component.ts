import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [MatButton, MatError, MatFormField, MatInput, MatLabel, NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive, MatIcon],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
    signUpForm: FormGroup = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
    });

    constructor(private authenticationService: AuthenticationService) {}

    signUp() {
        this.authenticationService.register(this.signUpForm.value.username, this.signUpForm.value.password);
    }
}
