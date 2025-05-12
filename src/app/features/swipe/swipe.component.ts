import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationBuilder, animate, style} from '@angular/animations';
import {RecipeService} from '../../shared/services/recipe.service';
import {Recipe} from '../../core/models/recipe.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {UserRecipeService} from '../../shared/services/user-recipe.service';
import {EvaluationValue} from '../../core/enums/EvaluationValue';
import {KeycloakService} from '../../utils/keycloak/keycloak.service';
import {MatDialog} from '@angular/material/dialog';
import {MatchDialogComponent} from '../match-dialog/match-dialog.component';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  providers: [RecipeService, UserRecipeService],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss',
})
export class SwipeComponent implements OnInit {
  @ViewChild('cardEl', {static: false}) cardEl!: ElementRef;

  private actionCount              = 0;
  private userId: string           = '1';
  cards: Recipe[]                  = [];
  currentIndex                     = 0;
  currentTransform                 = '';
  private startX                   = 0;
  private currentX                 = 0;
  private startY                   = 0;
  private currentY                 = 0;
  private isDragging               = false;
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
    this.currentY = event.clientY;

    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;

    const rotation = deltaX * 0.1;
    this.currentTransform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
  }

  onPointerDown(event: PointerEvent) {
    this.startX = event.clientX;
    this.currentX = this.startX;
    this.startY = event.clientY;
    this.currentY = this.startY;
    this.isDragging = true;
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;

    const thresholdX = 400;
    const thresholdY = -300; // Swiping UP means Y decreases

    const currentRecipe = this.cards[this.currentIndex];

    if (deltaX > thresholdX) {
      // Swipe right → LIKE
      this.userRecipeService.updateUserRecipe(this.userId, currentRecipe.id, {
        userId: this.userId,
        recipeId: currentRecipe.id,
        notes: '',
        evaluation: EvaluationValue.LIKE
      }).subscribe(() => {
        this.swipeRight(deltaX);
        this.incrementCounterAndCheckMatch();
      });

    } else if (deltaX < -thresholdX) {
      // Swipe left → DISLIKE
      this.userRecipeService.updateUserRecipe(this.userId, currentRecipe.id, {
        userId: this.userId,
        recipeId: currentRecipe.id,
        notes: '',
        evaluation: EvaluationValue.DISLIKE
      }).subscribe(() => {
        this.swipeLeft(deltaX);
        this.incrementCounterAndCheckMatch();
      });

    } else if (deltaY < thresholdY) {
      // Swipe up → NEUTRAL
      this.markNeutral();
    } else {
      // Did not exceed any threshold → snap back
      this.snapBack(deltaX, deltaY);
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

  private stackBack() {
    const player = this.builder
      .build([
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '400ms ease-in',
          style({
            transform: 'translate(-50px, -75px) scale(0.90)',
            opacity: 0
          })
        )
      ])
      .create(this.cardEl.nativeElement);

    player.play();
    player.onDone(() => {
      player.destroy();

      // Move the current card to the back of the stack
      const card = this.cards[this.currentIndex];
      this.cards.splice(this.currentIndex, 1);
      this.cards.push(card);

      this.currentTransform = '';

      // Do NOT increment index since we rotate the array manually
      this.incrementCounterAndCheckMatch();
    });
  }

  markNeutral() {
    const currentCard = this.cards[this.currentIndex];
    this.userRecipeService.updateUserRecipe(this.userId, currentCard.id, {
      userId: this.userId,
      recipeId: currentCard.id,
      notes: '',
      evaluation: EvaluationValue.NEUTRAL
    }).subscribe(() => {
      this.stackBack();
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
      this.matchedRecipes = [];
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

  private snapBack(fromX: number, fromY: number = 0) {
    const rotation = fromX * 0.1;

    const player = this.builder
      .build([
        style({ transform: `translate(${fromX}px, ${fromY}px) rotate(${rotation}deg)` }),
        animate(
          '300ms ease-out',
          style({ transform: 'translate(0, 0) rotate(0)' })
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
      this.matchedRecipes = [];
    })
  }

  private incrementCounterAndCheckMatch() {
    this.actionCount++;
    if (this.actionCount % 10 === 0) {
      this.match();
    }
  }

  private match() {
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
