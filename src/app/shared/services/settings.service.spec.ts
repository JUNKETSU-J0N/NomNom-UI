import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsService } from './settings.service';
import { PreferenceType } from '../../core/enums/PreferenceType';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;

  const dummyUserId = '704bfee6-c9f4-40a2-b0d6-aa68ffc3505c';
  const dummyPreference: PreferenceType = PreferenceType.VEGAN;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService]
    });

    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no unmatched requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user preference', () => {
    service.getUserPreference(dummyUserId).subscribe(preference => {
      expect(preference).toEqual(dummyPreference);
    });

  const req = httpMock.expectOne(`http://localhost:8080/api/users/${dummyUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ preference: dummyPreference }); // mock response
  });

  it('should set user preference', () => {
    service.setUserPreference(dummyUserId, dummyPreference).subscribe(response => {
      expect(response).toEqual(dummyPreference); // because service returns the preference from response
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${dummyUserId}/preference`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ preference: dummyPreference });
    req.flush({ preference: dummyPreference }); // mock response
  });
});
