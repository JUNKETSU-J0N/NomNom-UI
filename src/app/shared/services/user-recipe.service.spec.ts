import { TestBed } from '@angular/core/testing';

import {UserRecipeService} from './user-recipe.service';
import {provideHttpClient} from '@angular/common/http';

describe('UserRecipeService', () => {
  let service: UserRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(UserRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
