import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingredient[];
  subscriptionWatcher: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscriptionWatcher.unsubscribe();
  }

  ngOnInit(): void {
    this.ingrediants = this.shoppingListService.getIngrediants();
    this.subscriptionWatcher = this.shoppingListService.newIngredientEvent.subscribe(
      (ingrediants: Ingredient[]) => {
        this.ingrediants = ingrediants;
      }
    );
  }
}
