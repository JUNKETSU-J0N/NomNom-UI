import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SwipeComponent } from './swipe/swipe.component';
import { RouterModule } from '@angular/router';
import { MyrecipesComponent } from './features/myrecipes/myrecipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SwipeComponent, LayoutComponent, RouterModule, MyrecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
