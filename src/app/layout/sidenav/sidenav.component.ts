import {Component, Input} from '@angular/core';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatCardHeader,
    MatCard,
    MatCardContent,
    RouterOutlet,
    RouterLink,
    MatIcon,
    MatListItemIcon,
    MatListItem,
    CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() opened = false;
  @Input() mode: 'side' | 'over' = 'side';
  currentRoute: string = '';

  menuItems = [
    {icon: 'home', label: 'Home', route: '/swipe'},
    {icon: 'chef_hat', label: 'MyRecepies', route: '/gangs'},
    {icon: 'lunch_dining', label: 'History', route: '/history'},
    {icon: 'cards_star', label: 'FoodMatch', route: '/events'},
    {icon: 'help', label: 'Help', route: '/help'},
    {icon: 'settings', label: 'Settings', route: '/settings'}
  ];

  constructor(private router: Router) {
    // Update the route display after a successful navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects.replace('/', '') || 'Home';
    });
}

trackByFn(index: number, item: any): number {
  return index;
}
}
