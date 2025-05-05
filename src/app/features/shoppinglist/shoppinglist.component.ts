import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { ShoppingList } from '../models/shopping-list.model';
import { ShoppingItem } from '../models/shopping-item.model';
import { Ingredient } from '../models/ingredient.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select';
import { Unit } from '../models/unit.enum';
import { IngredientType } from '../models/ingredientType.enum';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-shoppinglist',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon],

  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss'],
})
export class ShoppingListComponent implements OnInit , AfterViewInit
{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<ShoppingItem>();

  shoppingList: ShoppingList | null = null;

  // Für neue Items
  newIngredientName: string = '';
  newAmount: number = 1;
  newUnit: string = 'OTHER'; // Standardwert
  newType: string = 'OTHER'
 displayedColumns: string[] = ['added','name', 'amount','type', 'unit',  'actions'];
 unitEnum = Unit;
 typeEnum = IngredientType;

 selectedUnit: Unit = Unit.OTHER;  // Default-Wert
 selectedType: IngredientType = IngredientType.OTHER;  // Default-Wert
 filterName: string = '';
 filterType: string = '';

  constructor(private shoppingListService: ShoppingListService) { }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(): void {
    const name = this.filterName.trim().toLowerCase();
    const type = this.filterType.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: ShoppingItem, filter: string) => {
      const [nameFilter, typeFilter] = filter.split('|');
      return data.ingredient.name.toLowerCase().includes(nameFilter) &&
             data.ingredient.type?.toLowerCase().includes(typeFilter);
    };

    this.dataSource.filter = `${name}|${type}`;
  }

  ngOnInit(): void {
    this.loadShoppingList();
  }

  loadShoppingList(): void {
    this.shoppingListService.getShoppingList().subscribe({
      next: (data) => {
        this.shoppingList = data;
        this.dataSource.data = data.items;
      },
      error: (err) => console.error('Fehler beim Laden der Liste', err)
    });
  }

  addItem(): void {
    if (!this.newIngredientName.trim()) return;

    const newItem = {
      ingredient: {
        name: this.newIngredientName,
        type: 'OTHER',  // Default für neue Zutaten
        unit: this.newUnit
      },
      amount: this.newAmount,
      unit: this.newUnit,
      added: false
    };

    this.shoppingListService.addItemToList(newItem).subscribe({
      next: () => {
        this.newIngredientName = '';
        this.newAmount = 1;
        this.newUnit = 'PIECE';
        this.loadShoppingList(); // Liste neu laden
      },
      error: (err) => console.error('Fehler beim Hinzufügen', err)
    });
  }

  removeItem(itemId: number): void {
    this.shoppingListService.removeItem(itemId).subscribe({
      next: () => this.loadShoppingList(),
      error: (err) => console.error('Fehler beim Löschen', err)
    });
  }

  resetList(): void {
    this.shoppingListService.resetList().subscribe({
      next: () => this.loadShoppingList(),
      error: (err) => console.error('Fehler beim Zurücksetzen', err)
    });
  }
  toggleAdded(item: ShoppingItem):void {
    item.added = !item.added;
    this.shoppingListService.updateItem(item).subscribe({
      next: () => this.loadShoppingList(),
      error: (err) => console.error('Fehler beim Updaten', err)
    })

  }

  getUnitLabel(unit: string): string {
    return this.unitEnum[unit as keyof typeof this.unitEnum] ?? unit;
  }

  getTypeLabel(type: string): string {
    return this.typeEnum[type as keyof typeof this.typeEnum] ?? type;
  }
}