import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import {UserService} from './shared/services/user.service';
import {KeycloakService} from './utils/keycloak/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
constructor(
  private userService: UserService,
  private keycloak: KeycloakService
) {}

  ngOnInit(): void {
    const userId = this.keycloak.userId;
    console.log(userId)
    this.userService.checkIfUserExists(userId).subscribe(() => {
      console.log('sub block')
    });
  }
}
