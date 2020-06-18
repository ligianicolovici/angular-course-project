import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State } from '../auth/store/auth.reducer';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit, OnDestroy {
  private authWatcher: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnDestroy(): void {
    this.authWatcher.unsubscribe();
  }
  ngOnInit(): void {
    this.authWatcher = this.store
      .select('auth')
      .pipe(map((authState: State) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveRecipes() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchRecipes() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
