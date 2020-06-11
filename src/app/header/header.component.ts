import {
  Component,
  Output,
  EventEmitter,
  Injectable,
  OnDestroy,
} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent {
  constructor(private storageService: DataStorageService) {}

  onSaveRecipes() {
    this.storageService.storeRecipes();
  }

  onFetchRecipes() {
    this.storageService.fetchRecipes().subscribe();
  }
}
