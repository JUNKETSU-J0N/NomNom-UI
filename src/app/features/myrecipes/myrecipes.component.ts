import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {RouterModule} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {RecipeService} from '../../shared/services/recipe.service';
import {Recipe} from '../../core/models/recipe.model';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-myrecipes',
  standalone: true,
  imports: [
    CdkTableModule,
    RouterModule,
    MatProgressSpinner,
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatButton,
    MatSortModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ],
  templateUrl: './myrecipes.component.html',
  styleUrl: './myrecipes.component.scss'
})
export class MyrecipesComponent implements OnInit {


  recipes: Recipe[] = [];
  displayedColumns: string[] = ['name', 'description'];
  filteredDataSource = new MatTableDataSource<Recipe>();
  searchTerm: string = '';
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filteredDataSource.paginator = this.paginator;
      this.sort.sortChange.subscribe(() => {
        const direction = this.sort.direction;
        if (!direction) {
          this.sort.direction = 'asc';
          this.filteredDataSource.sort = this.sort;
        }
      });
    });
  }

  loadRecipes() {
    this.loading = true;
    this.recipeService.getAllRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.filteredDataSource.data = recipes;
      this.loading = false;
    });
  }

  search() {
    if (!this.searchTerm.trim()) {
      this.loadRecipes();
      return;
    }

    this.loading = true;

    this.recipeService.searchRecipes(this.searchTerm.trim()).subscribe((results: Recipe[]) => {
      this.filteredDataSource.data = results;
      this.loading = false;
    });
  }
}