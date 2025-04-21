import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [CommonModule, HammerModule],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss',
  animations: [
    trigger('swipeAnimation', [
      state('center', style({ transform: 'translateX(0)' })),
      state('swipedLeft', style({ transform: 'translateX(-1000px)' })),
      state('swipedRight', style({ transform: 'translateX(1000px)' })),
      transition('center => swipedLeft', [
        animate('500ms ease-out', keyframes([
          style({ transform: 'translateX(0) rotate(0deg)', offset: 0 }),
          style({ transform: 'translateX(-200px) rotate(-20deg)', offset: 0.3 }),
          style({ transform: 'translateX(-1000px) rotate(-30deg)', offset: 1.0 })
        ]))
      ]),
      transition('center => swipedRight', [
        animate('500ms ease-out', keyframes([
          style({ transform: 'translateX(0) rotate(0deg)', offset: 0 }),
          style({ transform: 'translateX(200px) rotate(20deg)', offset: 0.3 }),
          style({ transform: 'translateX(1000px) rotate(30deg)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class SwipeComponent {
  animationState = 'center';
  currentTransform = '';
  private startX = 0;
  private currentX = 0;

  // Handle swipe gestures
  onPanStart(event: any) {
    console.log('PAN START', event);
    this.startX = this.currentX = event.center.x;
  }

  onPanMove(event: any) {
    console.log('PAN MOVE', event);
    this.currentX = event.center.x;
    const deltaX = this.currentX - this.startX;
    const rotation = deltaX * 0.1;
    this.currentTransform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
  }

  onPanEnd(event: any) {
    console.log('PAN END', event);
    const deltaX = this.currentX - this.startX;
    const threshold = 100;

    if (deltaX > threshold) {
      this.swipeRight();
    } else if (deltaX < -threshold) {
      this.swipeLeft();
    } else {
      this.currentTransform = '';
    }
  }

  // Handle button clicks
  swipeLeft() {
    this.animationState = 'swipedLeft';
    setTimeout(() => {
      console.log('Swiped left!');
      this.resetCard();
    }, 500);
  }

  swipeRight() {
    this.animationState = 'swipedRight';
    setTimeout(() => {
      console.log('Swiped right!');
      this.resetCard();
    }, 500);
  }

  private resetCard() {
    this.animationState = 'center';
    this.currentTransform = '';
  }
}