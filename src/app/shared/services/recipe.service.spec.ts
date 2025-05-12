import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { HttpService } from '../../core/services/http.service';
import { of } from 'rxjs';
import { Recipe } from '../../core/models/recipe.model';
import {PreferenceType} from '../../core/enums/PreferenceType';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: 'Pasta',
      description: '',
      preferenceType: PreferenceType.MEAT_LOVER,
      ingredients: []
    },
    {
      id: 2,
      name: 'Burger',
      description: '',
      preferenceType: PreferenceType.VEGAN,
      ingredients: []
    }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(RecipeService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should get all recipes', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.getAllRecipes().subscribe(recipes => {
      expect(recipes.length).toBe(2);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes');
  });

  it('should get recipe by ID', () => {
    const recipe = mockRecipes[0];
    httpServiceSpy.get.and.returnValue(of(recipe));

    service.getRecipeById('1').subscribe(result => {
      expect(result).toEqual(recipe);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/1');
  });

  it('should create a recipe', () => {
    const recipe = mockRecipes[0];
    httpServiceSpy.post.and.returnValue(of(recipe));

    service.createRecipe(recipe).subscribe(result => {
      expect(result).toEqual(recipe);
    });

    expect(httpServiceSpy.post).toHaveBeenCalledWith('recipes', recipe);
  });

  it('should update a recipe', () => {
    const recipe = mockRecipes[0];
    httpServiceSpy.put.and.returnValue(of(recipe));

    service.updateRecipe('1', recipe).subscribe(result => {
      expect(result).toEqual(recipe);
    });

    expect(httpServiceSpy.put).toHaveBeenCalledWith('recipes/1', recipe);
  });

  it('should delete a recipe', () => {
    const recipe = mockRecipes[0];
    httpServiceSpy.delete.and.returnValue(of(recipe));

    service.deleteRecipe('1').subscribe(result => {
      expect(result).toEqual(recipe);
    });

    expect(httpServiceSpy.delete).toHaveBeenCalledWith('recipes/1');
  });

  it('should search recipes', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.searchRecipes('pasta').subscribe(results => {
      expect(results.length).toBe(2);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/search', {
      params: jasmine.anything()
    });
  });

  it('should get shuffled recipes', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.getAllRecipesShuffled('123').subscribe(results => {
      expect(results).toEqual(mockRecipes);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/shuffled', {
      params: jasmine.anything()
    });
  });

  it('should perform soft reset', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.softResetRecipes('123').subscribe(results => {
      expect(results).toEqual(mockRecipes);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/123/soft-reset-evaluations');
  });

  it('should perform hard reset', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.hardResetRecipes('123').subscribe(results => {
      expect(results).toEqual(mockRecipes);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/123/hard-reset-evaluations');
  });

  it('should check for matches', () => {
    httpServiceSpy.get.and.returnValue(of(mockRecipes));

    service.checkMatch('123').subscribe(results => {
      expect(results).toEqual(mockRecipes);
    });

    expect(httpServiceSpy.get).toHaveBeenCalledWith('recipes/check-match', {
      params: jasmine.anything()
    });
  });
});
