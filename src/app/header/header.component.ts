import {
  Component,
  Output,
  EventEmitter,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State } from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit, OnDestroy {
  private authWatcher: Subscription;
  isAuthenticated = false;

  constructor(
    private storageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
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
    this.storageService.storeRecipes();
  }

  onFetchRecipes() {
    this.storageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
