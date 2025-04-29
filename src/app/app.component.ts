import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import { SwipeComponent } from './swipe/swipe.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './features/shoppinglist/shoppinglist.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SwipeComponent, LayoutComponent,FormsModule,ShoppingListComponent, MatCardModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,MatCheckboxModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
}
