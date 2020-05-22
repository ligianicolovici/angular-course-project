import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'course-app';
  selectedPage: string = 'Recipes';

  onUserChoice(pageName: { page: string }) {
    console.log(pageName);
    this.selectedPage = pageName.page;
    console.log(this.selectedPage);
  }
}
