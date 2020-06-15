import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserCredentials, AuthResponseData } from './auth.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLogged = true;
  isLoading = false;
  isRegistered = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogged = !this.isLogged;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userCredentials: UserCredentials = {
      email: form.value.email,
      password: form.value.password,
    };

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLogged) {
      authObs = this.authService.login(userCredentials);
    } else {
      authObs = this.authService.signup(userCredentials);
    }
    authObs.subscribe(
      (responseData) => {
        if (responseData.registered === true) {
          this.isRegistered = true;
        }
        this.router.navigate(['./recipes']);
        this.isLoading = false;
      },
      (errorMesssage) => {
        this.error = errorMesssage;
        console.log(errorMesssage);
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
