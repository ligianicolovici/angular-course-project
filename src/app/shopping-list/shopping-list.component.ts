import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingrediants: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingrediants = this.shoppingListService.getIngrediants();
    this.shoppingListService.newIngredientEvent.subscribe(
      (ingrediants: Ingredient[]) => {
        this.ingrediants = ingrediants;
      }
    );
  }
}
