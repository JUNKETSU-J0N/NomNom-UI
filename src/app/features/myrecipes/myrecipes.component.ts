import { Component } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-myrecipes',
  standalone: true,
  imports: [CdkTableModule, RouterModule],
  templateUrl: './myrecipes.component.html',
  styleUrl: './myrecipes.component.scss'
})
export class MyrecipesComponent {
  // Beispieldaten:
  recipes = [
    { id: 1, name: 'Rezept 1', description: 'Beschreibung 1' },
    { id: 2, name: 'Rezept 2', description: 'Beschreibung 2' },
    { id: 3, name: 'Rezept 3', description: 'Beschreibung 3' }
  ];

}