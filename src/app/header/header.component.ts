import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // tslint:disable-next-line: no-output-rename
  @Output('onUserSelect') usersChoice = new EventEmitter<{ page: string }>();

  onOptionClick(event: HTMLAnchorElement) {
    this.usersChoice.emit({
      page: event.text,
    });
  }
}
