import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'shopping-list',
        component: ShoppingListComponent,
      },
    ]),
  ],
})
export class ShoppingModule {}
