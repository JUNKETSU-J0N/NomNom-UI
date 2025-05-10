import { Component } from '@angular/core';
import {Recipe} from '../../core/models/recipe.model';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-match-dialog',
  imports: [
    MatDialogActions,
    MatCardActions,
    MatCardContent,
    MatDialogContent,
    MatCard,
    MatCardTitle,
    CommonModule
  ],
  templateUrl: './match-dialog.component.html',
  styleUrl: './match-dialog.component.scss'
})
export class MatchDialogComponent {
  matchedRecipes: Recipe[] = [];

  constructor(private dialogRef: MatDialogRef<MatchDialogComponent>) {}

  goToRecipe(recipe: Recipe) {
    // Navigation oder Auswahl-Logik
  }

  rejectRecipe(recipe: Recipe) {
    // Entferne aus Liste oder setze als abgelehnt
  }

  closeDialog() {
    this.dialogRef.close();
  }

  surpriseMe() {
    const random = this.matchedRecipes[Math.floor(Math.random() * this.matchedRecipes.length)];
    this.goToRecipe(random);
  }
}
