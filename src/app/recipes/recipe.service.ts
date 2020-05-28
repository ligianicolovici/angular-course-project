import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'recipe1',
      'test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/recipe-image-legacy-id-1074500_11.jpg'
    ),
    new Recipe(
      'recipe2',
      'test2',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2018/09/recipe-image-legacy-id-327529_11.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // retruns a copy of this exact recipes array from this class
  }
}
