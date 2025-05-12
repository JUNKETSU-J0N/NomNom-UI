import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationBuilder, animate, style} from '@angular/animations';
import {RecipeService} from '../../shared/services/recipe.service';
import {Recipe} from '../../core/models/recipe.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {UserRecipeService} from '../../shared/services/user-recipe.service';
import {EvaluationValue} from '../../core/enums/EvaluationValue';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {KeycloakService} from '../../utils/keycloak/keycloak.service';
import {MatDialog} from '@angular/material/dialog';
import {MatchDialogComponent} from '../match-dialog/match-dialog.component';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    MatProgressSpinner
  ],
  providers: [RecipeService, UserRecipeService],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss',
})
export class SwipeComponent implements OnInit {
  @ViewChild('cardEl', {static: false}) cardEl!: ElementRef;

  private actionCount = 0;
  private userId: string = '1';
  cards: Recipe[] = [];
  currentIndex = 0;
  currentTransform = '';
  private startX = 0;
  private currentX = 0;
  private isDragging = false;
  private matchedRecipes: Recipe[] = [];

  constructor(
    private builder: AnimationBuilder,
    private recipeService: RecipeService,
    private userRecipeService: UserRecipeService,
    private keycloakService: KeycloakService,
    private dialog: MatDialog
  ) {
  }

  get visibleCards() {
    return this.cards.slice(this.currentIndex, this.currentIndex + 2);
  }

  private resetCard() {
    this.currentTransform = '';
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDragging) return;

    this.currentX = event.clientX;
    const deltaX = this.currentX - this.startX;
    const rotation = deltaX * 0.1;
    this.currentTransform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
  }

  onPointerDown(event: PointerEvent) {
    this.startX = event.clientX;
    this.currentX = this.startX;
    this.isDragging = true;
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaX = this.currentX - this.startX;
    const threshold = 300;

    const currentRecipe = this.cards[this.currentIndex];

    if (deltaX > threshold) {
      // Rechts geswiped → Like
      this.userRecipeService.updateUserRecipe(this.userId, currentRecipe.id, {
        userId: this.userId,
        recipeId: this.cards[this.currentIndex].id,
        notes: '',
        evaluation: EvaluationValue.LIKE
      }).subscribe(() => {
        this.swipeRight(deltaX);
        this.incrementCounterAndCheckMatch();
      });

    } else if (deltaX < -threshold) {
      // Links geswiped → Dislike
      this.userRecipeService.updateUserRecipe(this.userId, currentRecipe.id, {
        userId: this.userId,
        recipeId: this.cards[this.currentIndex].id,
        notes: '',
        evaluation: EvaluationValue.DISLIKE
      }).subscribe(() => {
        this.swipeLeft(deltaX);
        this.incrementCounterAndCheckMatch();
      });
    } else {
      this.snapBack(deltaX);
    }
  }


  swipeLeft(fromX: number = 0) {
    this.animateSwipe(fromX, -1100);
  }

  swipeRight(fromX: number = 0) {
    this.animateSwipe(fromX, 1100);
  }

  swipeNeutral(fromX: number = 0) {
    this.animateSwipe(fromX, 0);
  }

  likeCard() {
    this.userRecipeService.updateUserRecipe(this.userId, this.cards[this.currentIndex].id, {
      userId: this.userId,
      recipeId: this.cards[this.currentIndex].id,
      notes: '',
      evaluation: EvaluationValue.LIKE
    }).subscribe(
      () => {
        this.swipeRight();
        this.incrementCounterAndCheckMatch();
      }
    );
    // this.swipeRight();
    // this.incrementCounterAndCheckMatch();
  }

  dislikeCard() {
    this.userRecipeService.updateUserRecipe(this.userId, this.cards[this.currentIndex].id, {
      userId: this.userId,
      recipeId: this.cards[this.currentIndex].id,
      notes: '',
      evaluation: EvaluationValue.DISLIKE
    }).subscribe(() => {
      this.swipeLeft();
      this.incrementCounterAndCheckMatch();
    });
  }

  blockCard() {
    this.userRecipeService.updateUserRecipe(this.userId, this.cards[this.currentIndex].id, {
      userId: this.userId,
      recipeId: this.cards[this.currentIndex].id,
      notes: '',
      evaluation: EvaluationValue.BLOCK
    }).subscribe(() => {
      this.swipeLeft();
      this.incrementCounterAndCheckMatch();
    });
  }

  markNeutral() {
    this.userRecipeService.updateUserRecipe(this.userId, this.cards[this.currentIndex].id, {
      userId: this.userId,
      recipeId: this.cards[this.currentIndex].id,
      notes: '',
      evaluation: EvaluationValue.NEUTRAL
    }).subscribe(() => {
      this.swipeNeutral();
      this.incrementCounterAndCheckMatch();
    });
  }


  favoriteCard() {
    this.userRecipeService.updateUserRecipe(this.userId, this.cards[this.currentIndex].id, {
      userId: this.userId,
      recipeId: this.cards[this.currentIndex].id,
      notes: '',
      evaluation: EvaluationValue.FAVORITE
    }).subscribe(
      () => {
        this.swipeRight();
        this.incrementCounterAndCheckMatch();
      }
    );
  }

  resetRecipes() {
    this.recipeService.softResetRecipes(this.userId).subscribe((recipes) => {})                          ;
    this.recipeService.getAllRecipesShuffled(this.userId).subscribe((recipes) => {
      this.cards = recipes
    })
  }

  private animateSwipe(fromX: number, toX: number) {
    const rotationMatch = this.currentTransform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
    const currentRotation = rotationMatch ? parseFloat(rotationMatch[1]) : 0;

    const player = this.builder
      .build([
        style({transform: `translateX(${fromX}px) rotate(${currentRotation}deg)`}),
        animate(
          '500ms ease-out',
          style({
            transform: `translateX(${toX}px) rotate(${toX > 0 ? 90 : -90}deg)`,
          })
        ),
      ])
      .create(this.cardEl.nativeElement);

    player.play();
    player.onDone(() => {
      player.destroy();
      this.currentTransform = '';
      this.resetCard();
    });
  }

  private snapBack(fromX: number) {
    const rotation = fromX * 0.1;
    const player = this.builder
      .build([
        style({transform: `translateX(${fromX}px) rotate(${rotation}deg)`}),
        animate(
          '300ms ease-out',
          style({transform: 'translateX(0) rotate(0)'})
        ),
      ])
      .create(this.cardEl.nativeElement);

    player.play();
    player.onDone(() => {
      player.destroy();
      this.currentTransform = '';
    });
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipesShuffled(this.userId).subscribe((recipes) => {
      this.cards = recipes
    })
    // TODO: einkommentieren, wenn Keycloaknutzer in der DB verwendet werden
    // this.userId = this.keycloakService.userId;
  }

  hardResetRecipes() {
    this.recipeService.hardResetRecipes(this.userId).subscribe((recipes) => {});
    this.recipeService.getAllRecipesShuffled(this.userId).subscribe((recipes) => {
      this.cards = recipes
    })
  }

  private incrementCounterAndCheckMatch() {
    this.actionCount++;
    if (this.actionCount % 10 === 0) {
      this.match();
    }
  }

  private match() {
    console.log('Match-Funktion ausgelöst bei', this.actionCount);
    var count = this.matchedRecipes.length;
    this.recipeService.checkMatch(this.userId)
      .subscribe((recipes) => {
        this.matchedRecipes = recipes;
        if (count < this.matchedRecipes.length) {
          this.openMatchDialog();
        }
      });
  }

  openMatchDialog() {
    this.dialog.open(MatchDialogComponent, {
      width: '400px',
      disableClose: true,
      data: this.matchedRecipes
    });
  }
}
