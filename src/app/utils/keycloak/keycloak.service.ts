import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  constructor() { }
  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8081',
        realm: 'nomnom',
        clientId: 'nomnom-ui'
      });
    }
    return this._keycloak;
  }

  async init() {
  const authenticated = await this.keycloak?.init({
    onLoad: 'login-required',
    checkLoginIframe: false
  });

  if (authenticated) {
    localStorage.setItem('token', this.keycloak.token ?? '');
  }
}

  async login() {
    await this.keycloak?.login();
  }


  get userId() {
    return this.keycloak?.tokenParsed?.sub as string;
  }

  get isTokenValid() {
    return !this.keycloak?.isTokenExpired();
  }

  get fullName() {
    return this.keycloak?.tokenParsed?.['name'] as string;
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: 'http://localhost:4200'});
  }

  accountManagement() {
    return this.keycloak?.accountManagement();}


}
