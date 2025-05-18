import { Component, OnInit } from '@angular/core';
import { PreferenceType } from '../../core/enums/PreferenceType';
import { SettingsService } from '../../shared/services/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
})
export class SettingsComponent implements OnInit {
  preferenceTypes = [
  {
    type: PreferenceType.NONE,
    label: 'Keine Präferenz',
    description: 'Ich möchte alles sehen.',
  },
  {
    type: PreferenceType.VEGAN,
    label: 'Vegan',
    description:
      'Komplett pflanzenbasierte Ernährung – ideal für Umweltbewusste oder Personen mit tierfreien Lebensstilen.',
  },
  {
    type: PreferenceType.VEGETARIAN,
    label: 'Vegetarisch',
    description:
      'Ernährung ohne Fleisch oder Fisch, aber mit tierischen Produkten wie Milch oder Eiern – eine ausgewogene und nachhaltige Wahl.',
  },
  {
    type: PreferenceType.MEAT_LOVER,
    label: 'Fleischliebhaber',
    description:
      'Bevorzugt herzhafte Gerichte mit Fleisch – ideal für proteinreiche und traditionelle Mahlzeiten.',
  },
  {
    type: PreferenceType.PESCETARIAN,
    label: 'Pescetarisch',
    description:
      'Vegetarische Ernährung mit Fisch und Meeresfrüchten – ausgewogen und oft als mediterran inspiriert.',
  },
  {
    type: PreferenceType.HIGH_PROTEIN,
    label: 'Eiweißreich',
    description:
      'Fokus auf eiweißreiche Lebensmittel wie Fleisch, Hülsenfrüchte oder Milchprodukte – ideal für Sportler oder Muskelaufbau.',
  },
];

  selectedPreference: PreferenceType = PreferenceType.NONE;
  userId: string = ''; // Populate from Keycloak or AuthService

  constructor(
    private settingsService: SettingsService,
    private keycloakService: KeycloakService
  ) {}

  getUserIdFromToken(): string {
    return this.keycloakService.userId;
  }

  ngOnInit() {
    // load user info from auth or service
    this.userId = this.getUserIdFromToken(); // implement as needed
    this.settingsService.getUserPreference(this.userId).subscribe((pref) => {
      this.selectedPreference = pref;
    });
  }

  onPreferenceChange(type: PreferenceType): void {
    this.selectedPreference = type;
    this.settingsService.setUserPreference(this.userId, type).subscribe(() => {
      console.log('Preference updated');
    });
  }

  resetPreference(): void {
    this.onPreferenceChange(PreferenceType.NONE);
  }
}
