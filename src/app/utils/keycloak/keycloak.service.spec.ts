import { TestBed } from '@angular/core/testing';
import { KeycloakService } from './keycloak.service';
import Keycloak from 'keycloak-js';

// Mock von Keycloak-Instanz
const mockKeycloakInstance = {
  init: jasmine.createSpy('init').and.resolveTo(true),
  login: jasmine.createSpy('login').and.resolveTo(true),
  logout: jasmine.createSpy('logout').and.resolveTo(true),
  accountManagement: jasmine.createSpy('accountManagement').and.resolveTo(true),
  isTokenExpired: jasmine.createSpy('isTokenExpired').and.returnValue(false),
  tokenParsed: {
    sub: 'user-123',
    name: 'John Doe'
  }
};

describe('KeycloakService', () => {
  let service: KeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeycloakService]
    });

    service = TestBed.inject(KeycloakService);

    // Direkte Zuweisung zur Umgehung des echten Konstrukts
    (service as any)._keycloak = mockKeycloakInstance as unknown as Keycloak;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize Keycloak', async () => {
    await service.init();
    expect(mockKeycloakInstance.init).toHaveBeenCalledWith({
      onLoad: 'login-required',
      checkLoginIframe: false
    });
  });

  it('should call login', async () => {
    await service.login();
    expect(mockKeycloakInstance.login).toHaveBeenCalled();
  });

  it('should return userId from tokenParsed', () => {
    expect(service.userId).toBe('user-123');
  });

  it('should return fullName from tokenParsed', () => {
    expect(service.fullName).toBe('John Doe');
  });

  it('should return isTokenValid as true', () => {
    expect(service.isTokenValid).toBe(true);
  });

  it('should call logout with redirectUri', () => {
    service.logout();
    expect(mockKeycloakInstance.logout).toHaveBeenCalledWith({
      redirectUri: 'http://localhost:4200'
    });
  });

  it('should call accountManagement', () => {
    service.accountManagement();
    expect(mockKeycloakInstance.accountManagement).toHaveBeenCalled();
  });
});
