import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let keycloakServiceStub: Partial<KeycloakService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    keycloakServiceStub = {
      fullName: 'John Doe'
    };

    await TestBed.configureTestingModule({
      imports: [MatCardModule, DashboardComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: KeycloakService, useValue: keycloakServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the user name from KeycloakService', () => {
    expect(component['name']).toBe('John Doe');
  });

  it('should navigate to a given route', () => {
    const route = '/recipes';
    component.navigateTo(route);
    expect(routerSpy.navigate).toHaveBeenCalledWith([route]);
  });
});
