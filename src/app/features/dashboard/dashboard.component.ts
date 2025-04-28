import {Component, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {KeycloakService} from '../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  private readonly keycloakService = inject(KeycloakService);
  protected readonly name = this.keycloakService.fullName;


}
