import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';

export class ShoppingListService {
  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  newIngredientEvent = new Subject<Ingredient[]>();

  getIngrediants() {
    return this.ingrediants.slice();
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingrediants.push(ingredient);
    this.newIngredientEvent.next(this.ingrediants.slice());
  }
  addListOfIngredients(ingrediants: Ingredient[]) {
    ingrediants.forEach((ing) => {
      const search = this.ingrediants.find(
        (ingredient) => ingredient.name === ing.name
      );
      if (search) {
        search.quantity = search.quantity + ing.quantity;
      } else {
        this.ingrediants.push(ing);
      }
    });
    this.newIngredientEvent.next(this.ingrediants.slice());
  }
}
