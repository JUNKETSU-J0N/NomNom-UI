import { Ingredient} from './ingredient.model';

export interface ShoppingItem {
  id: number;
  ingredient: Ingredient;
  amount: number;
  added: boolean;
}