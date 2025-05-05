import { TestBed } from '@angular/core/testing';

import {provideHttpClient} from '@angular/common/http';
import {ShoppingListService} from './shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
