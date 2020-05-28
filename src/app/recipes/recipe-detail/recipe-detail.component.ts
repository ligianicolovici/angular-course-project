import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  @Input() currentRecipe: Recipe;
  constructor(private recipeSercive: RecipeService) {}
  onToShoppingList() {
    this.recipeSercive.sendRecipeIngredients(this.currentRecipe.ingredients);
    return new alert('Ingredients sent to shopping list!');
  }
}
