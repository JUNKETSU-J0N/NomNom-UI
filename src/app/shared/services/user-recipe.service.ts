import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {UserRecipeModel} from '../../core/models/userRecipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  private route = 'userrecipe';


  constructor(private httpService: HttpService) { }

    updateUserRecipe(userID: string, recipeID: number, userRecipe: UserRecipeModel): Observable<any> {
    return this.httpService.put(`${this.route}/${userID}/${recipeID}`, userRecipe);
  }

}
