import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserCredentials, AuthResponseData } from './auth.model';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLogged = true;
  isLoading = false;
  isRegistered = false;
  error: string = null;

  closeEventWatcher: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.showErrorAlert(errorMesssage);
        console.log(errorMesssage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = errorMessage;
    this.closeEventWatcher = componentRef.instance.closeEvent.subscribe(() => {
      this.closeEventWatcher.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeEventWatcher) {
      this.closeEventWatcher.unsubscribe();
    }
  }
}
