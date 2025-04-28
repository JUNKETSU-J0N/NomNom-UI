import { Unit} from '../enums/Unit';

export interface RecipeIngredientDto {
  ingredientId: number;
  amount: number;
  unit: Unit;
}

export interface RecipeRequest {
  name: string;
  description: string;
  ingredients: RecipeIngredientDto[];
}

export interface RecipeResponse {
  id: number;
  name: string;
  description: string;
  ingredients: RecipeIngredientDto[];
}

export class Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: RecipeIngredientDto[];

  constructor(id: number, name: string, description: string, ingredients: RecipeIngredientDto[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
  }
}
