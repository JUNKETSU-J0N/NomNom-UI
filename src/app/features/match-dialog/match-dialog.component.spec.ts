import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchDialogComponent } from './match-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../core/models/recipe.model';
import {PreferenceType} from '../../core/enums/PreferenceType'; // Damit die Rezepte korrekt erkannt werden

describe('MatchDialogComponent', () => {
  let component: MatchDialogComponent;
  let fixture: ComponentFixture<MatchDialogComponent>;

  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: 'Burger',
      description: '',
      preferenceType: PreferenceType.MEAT_LOVER,
      ingredients: []
    },
    {
      id: 2,
      name: 'Veggi-Burger',
      description: '',
      preferenceType: PreferenceType.VEGAN,
      ingredients: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchDialogComponent],
      providers: [
        // Mocked MatDialogRef und MAT_DIALOG_DATA
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy() } },
        { provide: MAT_DIALOG_DATA, useValue: mockRecipes },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
