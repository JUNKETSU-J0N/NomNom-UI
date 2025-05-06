import { Unit} from '../enums/Unit';
import {PreferenceType} from '../enums/PreferenceType';

export interface RecipeIngredientDto {
  ingredientId: number;
  amount: number;
  unit: Unit;
}

export interface RecipeRequest {
  name: string;
  description: string;
  preferenceType: PreferenceType;
  ingredients: RecipeIngredientDto[];
}

export interface RecipeResponse {
  id: number;
  name: string;
  description: string;
  preferenceType: PreferenceType;
  ingredients: RecipeIngredientDto[];
}

export class Recipe {
  id: number;
  name: string;
  description: string;
  preferenceType: PreferenceType;
  ingredients: RecipeIngredientDto[];

  constructor(id: number, name: string, description: string, preferenceType: PreferenceType, ingredients: RecipeIngredientDto[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.preferenceType = preferenceType;
    this.ingredients = ingredients;
  }
}
