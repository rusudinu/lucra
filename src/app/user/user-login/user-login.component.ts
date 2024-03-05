import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../services/AuthenticationService";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

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
    RouterLinkActive
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  signInForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit() { }
  signIn() {
this.authenticationService.signIn(this.signInForm.value.username, this.signInForm.value.password);

  }
}
