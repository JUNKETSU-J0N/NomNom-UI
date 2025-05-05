import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { ShoppingList } from '../../features/models/shopping-list.model';
import { IngredientType } from '../../features/models/ingredientType.enum';
import { Unit } from '../../features/models/unit.enum';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private apiUrl = 'shopping-list';

  constructor(private httpService: HttpService) { }

  getShoppingList(): Observable<ShoppingList> {
    return of({
      id: 1,
      items: [
        {
          id: 1,
          ingredient: {
            id: 1,
            unit: Unit.PIECE,
            type: IngredientType.VEGETABLE,
            name: 'Tomate'
          },
          amount: 2,
          added: false
        },
        {
          id: 2,
          ingredient: {
            id: 2,
            unit: Unit.LITER,
            type: IngredientType.DAIRY,
            name: 'Milch'
          },
          amount: 1,
          added: true
        }
      ]
    });

    // TODO richtigen aufruf einkommentieren, wenn Endpoint bereit
    // return this.httpService.get<ShoppingList>(this.apiUrl);
  }

  addItemToList(item: any): Observable<any> {
    return this.httpService.post(`${this.apiUrl}/items`, item);
  }

  removeItem(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/items/${id}`);
  }

  resetList(): Observable<void> {
    return this.httpService.delete<void>(this.apiUrl);
  }

  updateItem(item: any): Observable<any> {
    return this.httpService.post(`${this.apiUrl}/items`, item);
  }
}
