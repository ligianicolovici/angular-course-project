import {
  Component,
  Injectable,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataStorageService } from './shared/data-storage.service';
import { HeaderComponent } from './header/header.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Recipe } from './recipes/recipe.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
