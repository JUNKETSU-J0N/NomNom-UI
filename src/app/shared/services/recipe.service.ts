import { Injectable } from '@angular/core';
import { HttpService} from '../../core/services/http.service';
import { Observable } from 'rxjs';
import {Recipe} from "../../core/models/recipe.model";
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private route = 'recipes';

  constructor(private httpService: HttpService) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpService.get<Recipe[]>(this.route);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.httpService.get<Recipe>(`${this.route}/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpService.post(this.route, recipe);
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.httpService.put(`${this.route}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.httpService.delete(`${this.route}/${id}`);
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    const params = new HttpParams().set('searchTerm', query);
    return this.httpService.get<Recipe[]>(this.route + '/search', { params });
  }

  getAllRecipesShuffled(userId: string): Observable<Recipe[]> {
    const params = new HttpParams().set('userId', userId.toString());

    return this.httpService.get<Recipe[]>(this.route + '/shuffled', { params });
  }

  softResetRecipes(userId: string): Observable<Recipe[]> {
    // const params = new HttpParams().set('userId', userId.toString());
    return this.httpService.get<Recipe[]>(this.route + '/' + userId + '/soft-reset-evaluations');
  }

  hardResetRecipes(userId: string): Observable<Recipe[]> {
    // const params = new HttpParams().set('userId', userId.toString());

    return this.httpService.get<Recipe[]>(this.route + '/' + userId + '/hard-reset-evaluations');
  }

  checkMatch(userId: string) {
    const params = new HttpParams().set('userId', userId.toString());
    return this.httpService.get<Recipe[]>(`${this.route}/check-match`, { params });
  }
}
