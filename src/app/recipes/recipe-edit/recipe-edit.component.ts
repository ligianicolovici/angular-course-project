import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  title = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (params['id'] != null) {
        this.title = 'Edit recipe';
      } else {
        this.title = 'New recipe';
      }
    });
  }
}
