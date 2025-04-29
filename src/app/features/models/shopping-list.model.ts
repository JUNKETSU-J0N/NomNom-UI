import { ShoppingItem } from './shopping-item.model';

export interface ShoppingList {
  id: number;
  items: ShoppingItem[];
}