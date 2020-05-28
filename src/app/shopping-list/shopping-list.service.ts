import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  newIngredientEvent = new EventEmitter<Ingredient[]>();

  getIngrediants() {
    return this.ingrediants.slice();
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingrediants.push(ingredient);
    this.newIngredientEvent.emit(this.ingrediants.slice());
  }
}
