import {Routes} from '@angular/router';

import {SwipeComponent} from './swipe/swipe.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ImpressumComponent } from './features/impressum/impressum.component';
import { HelppageComponent } from './features/helppage/helppage.component';
import { HistoryComponent } from './features/history/history.component';
import { SettingsComponent } from './features/settings/settings.component';
import { MyrecipesComponent } from './features/myrecipes/myrecipes.component';
import { ShoppinglistComponent } from './features/shoppinglist/shoppinglist.component';

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'swipe',
    component: SwipeComponent
  },
  {
    path: 'help',
    component: HelppageComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'list',
    component: ShoppinglistComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'myrecipes',
    component: MyrecipesComponent
  },
  { // wildcard route, alles was nicht definiert ist und eingegeben wird, führt wieder zu home
    path: '**', redirectTo: 'home'
  }
];
