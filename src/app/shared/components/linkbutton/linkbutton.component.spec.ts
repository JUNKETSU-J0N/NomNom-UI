import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkbuttonComponent } from './linkbutton.component';

describe('LinkbuttonComponent', () => {
  let component: LinkbuttonComponent;
  let fixture: ComponentFixture<LinkbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkbuttonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'super text'); 
    fixture.componentRef.setInput('link', 'https://github.com/JUNKETSU-J0N/NomNom-WS'); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
