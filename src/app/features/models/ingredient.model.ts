import { IngredientType } from "./ingredientType.enum";
import { Unit } from "./unit.enum";


export interface Ingredient {
    id: number;
    name: string;
    type: IngredientType;
    unit: Unit;
  }
  