import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { PreferenceType } from '../../core/enums/PreferenceType';
import { of } from 'rxjs';
import { SettingsService } from '../../shared/services/settings.service';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';

// Mock SettingsService
class MockSettingsService {
  getUserPreference(userId: string) {
    return of(PreferenceType.VEGAN);
  }

  setUserPreference(userId: string, preference: PreferenceType) {
    return of(true);
  }
}

// Mock KeycloakService
class MockKeycloakService {
  userId = 'mock-user-id';
}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        { provide: SettingsService, useClass: MockSettingsService },
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user preference on init', fakeAsync(() => {
    component.ngOnInit();
    tick(); // simulate async
    expect(component.selectedPreference).toBe(PreferenceType.VEGAN);
    expect(component.userId).toBe('mock-user-id');
  }));

  it('should update preference when onPreferenceChange is called', fakeAsync(() => {
    const spy = spyOn(settingsService, 'setUserPreference').and.callThrough();
    component.onPreferenceChange(PreferenceType.MEAT_LOVER);
    tick();
    expect(component.selectedPreference).toBe(PreferenceType.MEAT_LOVER);
    expect(spy).toHaveBeenCalledWith('mock-user-id', PreferenceType.MEAT_LOVER);
  }));

  it('should reset preference to NONE', fakeAsync(() => {
    const spy = spyOn(settingsService, 'setUserPreference').and.callThrough();
    component.resetPreference();
    tick();
    expect(component.selectedPreference).toBe(PreferenceType.NONE);
    expect(spy).toHaveBeenCalledWith('mock-user-id', PreferenceType.NONE);
  }));
});
