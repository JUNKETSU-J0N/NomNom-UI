import { TestBed } from '@angular/core/testing';

import { EvaluationService } from './evaluation.service';
import {provideHttpClient} from '@angular/common/http';

describe('EvaluationServiceService', () => {
  let service: EvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(EvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
