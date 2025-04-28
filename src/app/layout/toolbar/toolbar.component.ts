import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {KeycloakService} from '../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() toggle = new EventEmitter<void>();

  constructor(
    private keycloakService: KeycloakService,
  ) {}

  logout() {
    this.keycloakService.logout() .then(() => console.log('Logout erfolgreich'))
      .catch(err => console.error('Logout fehlgeschlagen', err));
  }

  editProfile() {
    this.keycloakService.accountManagement();
  }

}
