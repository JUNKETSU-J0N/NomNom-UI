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

  getShoppingList(userID: string): Observable<ShoppingList> {
    return this.httpService.get<ShoppingList>(`${this.apiUrl}/${userID}`);
  }

  addItemToList(userID: string,item: any): Observable<any> {
    return this.httpService.put(`${this.apiUrl}/${userID}/items`, item);
  }

  removeItem(itemid: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/delete/${itemid}`);
  }

  resetList(userID: string): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/reset/${userID}`);
  }

  updateItem(item: any): Observable<any> {
    return this.httpService.put(`${this.apiUrl}/update/items`, item);
  }
}
