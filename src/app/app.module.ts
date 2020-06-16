import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AppRoutesComponent } from './app-routes.model';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptior.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/shopping-list.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutesComponent,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
