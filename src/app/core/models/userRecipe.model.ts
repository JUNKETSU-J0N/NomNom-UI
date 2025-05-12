import {EvaluationValue} from '../enums/EvaluationValue';

export interface UserRecipeModel {
  recipeId: number;
  userId: string;
  notes: string;
  evaluation: EvaluationValue;
}
