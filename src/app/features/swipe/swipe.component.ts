import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationBuilder, animate, style} from '@angular/animations';
import {RecipeService} from '../../shared/services/recipe.service';
import {Recipe} from '../../core/models/recipe.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EvaluationService} from '../../shared/services/evaluation.service';
import {EvaluationValue} from '../../core/enums/EvaluationValue';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton
  ],
  providers: [RecipeService, EvaluationService],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss',
})
export class SwipeComponent implements OnInit {
  @ViewChild('cardEl', {static: false}) cardEl!: ElementRef;

  cards: Recipe[] = [];
  currentIndex = 0;
  currentTransform = '';
  private startX = 0;
  private currentX = 0;
  private isDragging = false;

  constructor(
    private builder: AnimationBuilder,
    private recipeService: RecipeService,
    private evaluationService: EvaluationService
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

    if (deltaX > threshold) {
      this.swipeRight(deltaX);
    } else if (deltaX < -threshold) {
      this.swipeLeft(deltaX);
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
    this.evaluationService.updateUserRecipe(1, this.cards[this.currentIndex].id, {notes: '', evaluationValue: EvaluationValue.LIKE});
    this.swipeRight();
  }

  dislikeCard() {
    this.evaluationService.updateUserRecipe(1, this.cards[this.currentIndex].id, {notes: '', evaluationValue: EvaluationValue.DISLIKE});
    this.swipeLeft();
  }

  blockCard() {
    this.evaluationService.updateUserRecipe(1, this.cards[this.currentIndex].id, {notes: '', evaluationValue: EvaluationValue.BLOCK});
    this.swipeLeft();
  }

  markNeutral() {
    this.evaluationService.updateUserRecipe(1, this.cards[this.currentIndex].id, {notes: '', evaluationValue: EvaluationValue.NEUTRAL});
    this.swipeNeutral();
  }

  favoriteCard() {
    this.evaluationService.updateUserRecipe(1, this.cards[this.currentIndex].id, {notes: '', evaluationValue: EvaluationValue.FAVORITE});
    this.swipeRight();
  }

  resetRecipes() {
    this.recipeService.resetRecipes();
    this.recipeService.getAllRecipesShuffled().subscribe((recipes) => {
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
    this.recipeService.getAllRecipesShuffled().subscribe((recipes) => {
      this.cards = recipes
    })
  }

  hardResetRecipes() {
    this.recipeService.hardResetRecipes();
    this.recipeService.getAllRecipesShuffled().subscribe((recipes) => {
      this.cards = recipes
    })
  }
}
