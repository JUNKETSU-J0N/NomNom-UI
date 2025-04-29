import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import {provideHttpClient} from '@angular/common/http';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
