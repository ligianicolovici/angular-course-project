import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'recipe1',
      'test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/recipe-image-legacy-id-1074500_11.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Onion', 3),
      ]
    ),
    new Recipe(
      'recipe2',
      'test2',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2018/09/recipe-image-legacy-id-327529_11.jpg',
      [
        new Ingredient('Potatoes', 1),
        new Ingredient('Carrots', 2),
        new Ingredient('Garlic', 3),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // retruns a copy of this exact recipes array from this class
  }
  sendRecipeIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addListOfIngredients(ingredients);
  }
  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }
}
