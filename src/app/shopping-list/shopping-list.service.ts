import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';

export class ShoppingListService {
  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  changedIngredientsEvent = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  getIngrediants() {
    return this.ingrediants.slice();
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingrediants.push(ingredient);
    this.changedIngredientsEvent.next(this.ingrediants.slice());
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
    this.changedIngredientsEvent.next(this.ingrediants.slice());
  }
  getIngredient(index: number) {
    return this.ingrediants[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingrediants[index] = newIngredient;
    this.changedIngredientsEvent.next(this.ingrediants.slice());
  }
  deleteIngredient(index: number) {
    this.ingrediants.splice(index, 1);
    this.changedIngredientsEvent.next(this.ingrediants.slice());
    console.log(this.ingrediants);
  }
}
