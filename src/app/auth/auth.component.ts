import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserCredentials } from './auth.model';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import { State } from './store/auth.reducer';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogged = true;
  isLoading = false;
  isRegistered = false;
  error: string = null;
  storeSubscriptionWatcher: Subscription;
  closeEventWatcher: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscriptionWatcher = this.store
      .select('auth')
      .subscribe((authState: State) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

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

    if (this.isLogged) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: userCredentials.email,
          password: userCredentials.password,
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignUpStart({
          email: userCredentials.email,
          password: userCredentials.password,
        })
      );
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
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
    this.storeSubscriptionWatcher.unsubscribe();
    if (this.closeEventWatcher) {
      this.closeEventWatcher.unsubscribe();
    }
  }
}
