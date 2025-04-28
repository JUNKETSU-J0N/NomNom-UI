import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwipeComponent } from './swipe.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';

describe('SwipeComponent', () => {
  let component: SwipeComponent;
  let fixture: ComponentFixture<SwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SwipeComponent],
    providers: [
      provideAnimations(),
      provideHttpClient()
    ],
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
