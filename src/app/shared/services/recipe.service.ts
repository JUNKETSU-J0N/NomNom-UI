import { Injectable } from '@angular/core';
import { HttpService} from '../../core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private route = 'recipes';

  constructor(private httpService: HttpService) { }

  getAllRecipes(): Observable<any[]> {
    return this.httpService.get<any[]>(this.route);
  }

  getRecipeById(id: string): Observable<any> {
    return this.httpService.get<any>(`${this.route}/${id}`);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.httpService.post(this.route, recipe);
  }

  updateRecipe(id: string, recipe: any): Observable<any> {
    return this.httpService.put(`${this.route}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.httpService.delete(`${this.route}/${id}`);
  }
}
