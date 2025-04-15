import { Component } from '@angular/core';
import { Utils } from '../utils';

@Component({
  selector: 'app-swipe',
  imports: [],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss'
})
export class SwipeComponent {
    greet = Utils.greet('Hamza');
}
