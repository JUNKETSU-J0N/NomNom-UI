import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwipeComponent } from './swipe.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';

// Dummy-Implementierung des KeycloakService
class MockKeycloakService {
  userId = 'mock-user-id';
}

describe('SwipeComponent', () => {
  let component: SwipeComponent;
  let fixture: ComponentFixture<SwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwipeComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
