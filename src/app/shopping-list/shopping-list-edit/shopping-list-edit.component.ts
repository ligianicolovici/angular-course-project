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
import { ShoppingListService } from '../shopping-list.service';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) templateForm: NgForm;
  subscriptionWatcher: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscriptionWatcher.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptionWatcher = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.templateForm.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity,
        });
      }
    );
  }
  onSubmit(templateForm: NgForm) {
    const value = templateForm.value;
    const newIngredient = new Ingredient(value.name, value.quantity);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    this.templateForm.reset();
  }
  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear() {
    this.templateForm.reset();
    this.editMode = false;
  }
}
