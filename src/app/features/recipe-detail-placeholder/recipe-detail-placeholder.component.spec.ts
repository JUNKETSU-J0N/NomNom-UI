import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailPlaceholderComponent } from './recipe-detail-placeholder.component';

describe('RecipeDetailPlaceholderComponent', () => {
  let component: RecipeDetailPlaceholderComponent;
  let fixture: ComponentFixture<RecipeDetailPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
