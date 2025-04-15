import {Routes} from '@angular/router';
import {SwipeComponent} from './swipe/swipe.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'swipe'
},
  {
    path: 'swipe',
    component: SwipeComponent
  },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // }
];
