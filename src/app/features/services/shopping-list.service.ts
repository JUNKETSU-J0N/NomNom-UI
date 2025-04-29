import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingList } from '../models/shopping-list.model';
import { Observable, of } from 'rxjs';
import { IngredientType } from '../models/ingredientType.enum';
import { Unit } from '../models/unit.enum';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:8080/api/shopping-list';

  constructor(private http: HttpClient) { }

  getShoppingList(): Observable<ShoppingList> {
    //return this.http.get<ShoppingList>(this.apiUrl);
    return of({
      id: 1,
      items: [
        {
          id: 1,
          ingredient: {
            id: 1,
            unit:Unit.PIECE,
            type:IngredientType.VEGETABLE,
            name: 'Tomate'
          },
          amount: 2,
          added: false
        },
        {
          id: 2,
          ingredient: {
            id: 2,
            unit:Unit.LITER,
            type:IngredientType.DAIRY,
            name: 'Milch'
          },
          amount: 1,
          added: true
        }
      ]
    });
  }

  addItemToList(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item);
  }

  removeItem(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }

  resetList(): Observable<void> {
  return this.http.delete<void>(this.apiUrl);
  }
  updateItem(item: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/items`, item);
  }
}