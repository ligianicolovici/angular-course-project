import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', { static: true }) ingredientName: ElementRef;
  @ViewChild('amountInput', { static: true }) ingredientAmount: ElementRef;
  @Output() ingredientSetUp = new EventEmitter<Ingredient>();

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    console.log(this.ingredientAmount.nativeElement.textContent);
    console.log(this.ingredientName.nativeElement.textContent);
  }
  onItemAdd() {
    const ingName = this.ingredientName.nativeElement.value;
    const ingAmount = this.ingredientAmount.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientSetUp.emit(newIngredient);
  }
}
