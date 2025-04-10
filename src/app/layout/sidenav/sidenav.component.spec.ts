import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { MatCardHeader, MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItemIcon, MatListItem } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        SidenavComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: []
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
