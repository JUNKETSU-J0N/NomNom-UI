import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrecipesComponent } from './myrecipes.component';
import {provideHttpClient} from '@angular/common/http';

describe('MyrecipesComponent', () => {
  let component: MyrecipesComponent;
  let fixture: ComponentFixture<MyrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyrecipesComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
