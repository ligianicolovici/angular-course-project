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
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.authWatcher.unsubscribe();
  }
  ngOnInit(): void {
    this.authWatcher = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveRecipes() {
    this.storageService.storeRecipes();
  }

  onFetchRecipes() {
    this.storageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
