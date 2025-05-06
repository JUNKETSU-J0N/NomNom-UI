import {Routes} from '@angular/router';
import { SwipeComponent } from './features/swipe/swipe.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ImpressumComponent } from './features/impressum/impressum.component';
import { HelppageComponent } from './features/helppage/helppage.component';
import { HistoryComponent } from './features/history/history.component';
import { SettingsComponent } from './features/settings/settings.component';
import { MyrecipesComponent } from './features/myrecipes/myrecipes.component';
import { ShoppingListComponent } from './features/shoppinglist/shoppinglist.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';

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
    component: ShoppingListComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'myrecipes',
    component: MyrecipesComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent
  },
  { // wildcard route, alles was nicht definiert ist und eingegeben wird, führt wieder zu home
    path: '**', redirectTo: 'home'
  }
];
