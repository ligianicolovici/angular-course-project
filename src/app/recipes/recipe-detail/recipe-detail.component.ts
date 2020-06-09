import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  nameOfCurrentRecipe: string;
  id: number;
  constructor(
    private recipeSercive: RecipeService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.currentRecipe = this.recipeSercive.getRecipeByIndex(this.id);
    });
  }
  onToShoppingList() {
    this.recipeSercive.sendRecipeIngredients(this.currentRecipe.ingredients);
    return new alert('Ingredients sent to shopping list!');
  }
  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.recipeSercive.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
