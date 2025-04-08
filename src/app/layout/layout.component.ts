import {Component, HostListener} from '@angular/core';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    ToolbarComponent,
    SidenavComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidenavOpened = true;
  sidenavMode: 'side' | 'over' = 'side';

  constructor() {
    this.updateSidenavMode();
  }

  onToggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  @HostListener('window:resize')
  updateSidenavMode() {
    const width = window.innerWidth;

    if (width < 768) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    }
  }
}
