import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  recipeEvent = new Subject<Recipe[]>();

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipesFetched: Recipe[]) {
    this.recipes = recipesFetched;
    this.recipeEvent.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice(); // retruns a copy of this exact recipes array from this class
  }
  sendRecipeIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
  }
  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipeEvent.next(this.getRecipes());
  }
  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeEvent.next(this.getRecipes());
  }
  updateIngredientList(recipeIndex: number, newIngredientList: Ingredient[]) {
    console.log(newIngredientList);
    this.recipes[recipeIndex].ingredients = newIngredientList;
    this.recipeEvent.next(this.getRecipes());
  }
  deleteRecipe(recipeIndex: number) {
    this.recipes.splice(recipeIndex, 1);
    this.recipeEvent.next(this.getRecipes());
  }
}
