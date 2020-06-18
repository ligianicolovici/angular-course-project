import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) templateForm: NgForm;
  subscriptionWatcher: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnDestroy(): void {
    this.subscriptionWatcher.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  ngOnInit(): void {
    this.subscriptionWatcher = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.templateForm.setValue({
            name: this.editedItem.name,
            quantity: this.editedItem.quantity,
          });
        } else {
          this.editMode = false;
        }
      });
  }
  onSubmit(templateForm: NgForm) {
    const value = templateForm.value;
    const newIngredient = new Ingredient(value.name, value.quantity);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.store.select('shoppingList').subscribe((ingredients) => {
        console.log(ingredients);
      });
    }
    this.editMode = false;
    this.templateForm.reset();
  }
  onDeleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  onClear() {
    this.templateForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;
  }
}
