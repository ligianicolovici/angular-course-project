import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailDefaultComponent } from './recipe-detail-default/recipe-detail-default.component';
import { AppRoutesComponent } from '../app-routes.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../shared/dropdown.directive';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeDetailDefaultComponent,
    RecipeEditComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
