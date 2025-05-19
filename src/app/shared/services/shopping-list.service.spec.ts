// import { TestBed } from '@angular/core/testing';
// import { ShoppingListService } from './shopping-list.service';
// import { HttpService } from '../../core/services/http.service';
// import { of } from 'rxjs';
// import { ShoppingList } from '../../features/models/shopping-list.model';
//
// describe('ShoppingListService', () => {
//   let service: ShoppingListService;
//   let httpServiceSpy: jasmine.SpyObj<HttpService>;
//
//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('HttpService', ['get', 'post', 'delete']);
//
//     TestBed.configureTestingModule({
//       providers: [
//         ShoppingListService,
//         { provide: HttpService, useValue: spy }
//       ]
//     });
//
//     service = TestBed.inject(ShoppingListService);
//     httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   it('should return hardcoded shopping list from getShoppingList()', (done) => {
//     service.getShoppingList().subscribe((list: ShoppingList) => {
//       expect(list.items.length).toBe(2);
//       expect(list.items[0].ingredient.name).toBe('Tomate');
//       done();
//     });
//   });
//
//   it('should add item to list', () => {
//     const dummyItem = { id: 3, name: 'Brot' };
//     httpServiceSpy.post.and.returnValue(of(dummyItem));
//
//     service.addItemToList(dummyItem).subscribe((res) => {
//       expect(httpServiceSpy.post).toHaveBeenCalledWith('shopping-list/items', dummyItem);
//       expect(res).toEqual(dummyItem);
//     });
//   });
//
//   it('should remove item by ID', () => {
//     httpServiceSpy.delete.and.returnValue(of(undefined));
//
//     service.removeItem(1).subscribe((res) => {
//       expect(httpServiceSpy.delete).toHaveBeenCalledWith('shopping-list/items/1');
//       expect(res).toBeUndefined();
//     });
//   });
//
//   it('should reset the shopping list', () => {
//     httpServiceSpy.delete.and.returnValue(of(undefined));
//
//     service.resetList().subscribe((res) => {
//       expect(httpServiceSpy.delete).toHaveBeenCalledWith('shopping-list');
//       expect(res).toBeUndefined();
//     });
//   });
//
//   it('should update an item in the list', () => {
//     const updatedItem = { id: 1, name: 'Updated Tomate' };
//     httpServiceSpy.post.and.returnValue(of(updatedItem));
//
//     service.updateItem(updatedItem).subscribe((res) => {
//       expect(httpServiceSpy.post).toHaveBeenCalledWith('shopping-list/items', updatedItem);
//       expect(res).toEqual(updatedItem);
//     });
//   });
// });
