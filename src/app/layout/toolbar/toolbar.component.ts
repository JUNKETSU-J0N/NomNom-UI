import {Component, EventEmitter, Output, OnInit} from '@angular/core';
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
export class ToolbarComponent implements OnInit{
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

  isDarkTheme = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';

    const html = document.documentElement;
    html.classList.add(this.isDarkTheme ? 'theme-dark' : 'theme-light');
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    const html = document.documentElement;
    html.classList.remove(this.isDarkTheme ? 'theme-light' : 'theme-dark');
    html.classList.add(this.isDarkTheme ? 'theme-dark' : 'theme-light');

    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }


}

