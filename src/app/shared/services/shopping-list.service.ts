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

  private apiUrl = 'shoppinglist';

  constructor(private httpService: HttpService) { }

  getShoppingList(): Observable<ShoppingList> {
       // TODO richtigen aufruf einkommentieren, wenn Endpoint bereit
    return this.httpService.get<ShoppingList>(`${this.apiUrl}/1`);
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
