import {Component, Input} from '@angular/core';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {NavigationEnd, Router, RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

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
    RouterLinkActive,
    MatIcon,
    MatListItemIcon,
    MatListItem,
    CommonModule,
    MatChipsModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() opened = false;
  @Input() mode: 'side' | 'over' = 'side';
  currentRoute: string = '';

  menuItems = [
    {icon: 'home', label: 'Start', route: '/home'},
    {icon: 'star', label: 'FoodMatch', route: '/swipe'},
    {icon: 'restaurant', label: 'Rezepte', route: '/myrecipes'},
    {icon: 'list', label: 'Liste', route: '/list'},
    {icon: 'history', label: 'Verlauf', route: '/history'},
    {icon: 'help', label: 'Hilfe', route: '/help'},
    {icon: 'settings', label: 'Einstellungen', route: '/settings'},
    {icon: 'email', label: 'Impressum', route: '/impressum'},
  ];
  // nette icons: lunch_dining fastfood

  constructor(
    private router: Router,
  ) {
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
