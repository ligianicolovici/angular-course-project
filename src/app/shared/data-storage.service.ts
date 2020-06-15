import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  fetchSuccess = new Subject<Recipe[]>();
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const postData: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        'https://course-project-7f1f5.firebaseio.com/recipes.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responsedData) => {
          if (responsedData.status === 200) {
            alert('Recipes were succesfully saved!');
          }
        },
        (error) => {
          alert('An error has occured!');
        }
      );
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://course-project-7f1f5.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
