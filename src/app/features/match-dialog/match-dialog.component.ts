import {Component, Inject, OnInit} from '@angular/core';
import {Recipe} from '../../core/models/recipe.model';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match-dialog',
  imports: [
    MatDialogActions,
    MatCardActions,
    MatCardContent,
    MatDialogContent,
    MatCard,
    MatCardTitle,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule
  ],
  templateUrl: './match-dialog.component.html',
  styleUrl: './match-dialog.component.scss'
})
export class MatchDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<MatchDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public matchedRecipes: Recipe[]
  ) {}

  goToRecipe(recipe: Recipe) {
    // Navigation oder Auswahl-Logik
    this.router.navigate(['/recipe', recipe.id]);
    this.dialogRef.close();
  }

  rejectRecipe(recipe: Recipe) {
    // Entferne aus Liste oder setze als abgelehnt
    const index = this.matchedRecipes.indexOf(recipe);
    if (index > -1) {
      this.matchedRecipes.splice(index, 1);
    }
    if (this.matchedRecipes.length === 0) {
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  surpriseMe() {
    const random = this.matchedRecipes[Math.floor(Math.random() * this.matchedRecipes.length)];
    this.goToRecipe(random);
  }

}
