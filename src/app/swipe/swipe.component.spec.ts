import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SwipeComponent } from './swipe.component';

describe('SwipeComponent', () => {
  let component: SwipeComponent;
  let fixture: ComponentFixture<SwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SwipeComponent, provideAnimationsAsync]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
