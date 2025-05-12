import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MyrecipesComponent } from './myrecipes.component';
import { RecipeService } from '../../shared/services/recipe.service';
import { of } from 'rxjs';
import { Recipe } from '../../core/models/recipe.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {PreferenceType} from '../../core/enums/PreferenceType';

describe('MyrecipesComponent', () => {
  let component: MyrecipesComponent;
  let fixture: ComponentFixture<MyrecipesComponent>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;

  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: 'Pizza',
      description: '',
      preferenceType: PreferenceType.MEAT_LOVER,
      ingredients: []
    },
    {
      id: 2,
      name: 'Burger',
      description: '',
      preferenceType: PreferenceType.MEAT_LOVER,
      ingredients: []
    }
  ];

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('RecipeService', ['getAllRecipes', 'searchRecipes']);

    TestBed.configureTestingModule({
      imports: [MyrecipesComponent],
      providers: [
        { provide: RecipeService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignoriere Template-spezifische Fehler
    }).compileComponents();

    fixture = TestBed.createComponent(MyrecipesComponent);
    component = fixture.componentInstance;
    recipeServiceSpy = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recipes on init', () => {
    recipeServiceSpy.getAllRecipes.and.returnValue(of(mockRecipes));

    component.ngOnInit();

    expect(recipeServiceSpy.getAllRecipes).toHaveBeenCalled();
    expect(component.filteredDataSource.data.length).toBe(2);
  });

  it('should search recipes when search term is not empty', () => {
    component.searchTerm = 'Pizza';
    recipeServiceSpy.searchRecipes.and.returnValue(of([mockRecipes[0]]));

    component.search();

    expect(recipeServiceSpy.searchRecipes).toHaveBeenCalledWith('Pizza');
    expect(component.filteredDataSource.data.length).toBe(1);
    expect(component.filteredDataSource.data[0].name).toBe('Pizza');
  });

  it('should reload all recipes when search term is empty', () => {
    recipeServiceSpy.getAllRecipes.and.returnValue(of(mockRecipes));
    component.searchTerm = '   ';

    component.search();

    expect(recipeServiceSpy.getAllRecipes).toHaveBeenCalled();
  });
});
