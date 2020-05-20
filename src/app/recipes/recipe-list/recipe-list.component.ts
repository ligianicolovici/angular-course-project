import { Component } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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
}
