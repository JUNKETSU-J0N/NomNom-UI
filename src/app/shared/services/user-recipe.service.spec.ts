import { TestBed } from '@angular/core/testing';
import { UserRecipeService } from './user-recipe.service';
import { HttpService } from '../../core/services/http.service';
import { of } from 'rxjs';
import { UserRecipeModel } from '../../core/models/userRecipe.model';
import { EvaluationValue } from '../../core/enums/EvaluationValue';

describe('UserRecipeService', () => {
  let service: UserRecipeService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['put']);

    TestBed.configureTestingModule({
      providers: [
        UserRecipeService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserRecipeService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpService.put with the correct URL and body', () => {
    const userID = '42';
    const recipeID = 101;
    const userRecipe: UserRecipeModel = {
      recipeId: recipeID,
      userId: userID,
      notes: 'Lecker und einfach!',
      evaluation: EvaluationValue.LIKE
    };

    httpServiceSpy.put.and.returnValue(of({ success: true }));

    service.updateUserRecipe(userID, recipeID, userRecipe).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    expect(httpServiceSpy.put).toHaveBeenCalledWith(`userrecipe/${userID}/${recipeID}`, userRecipe);
  });
});
