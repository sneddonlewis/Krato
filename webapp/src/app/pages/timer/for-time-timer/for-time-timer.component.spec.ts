import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForTimeTimerComponent } from './for-time-timer.component';

describe('ForTimeTimerComponent', () => {
  let component: ForTimeTimerComponent;
  let fixture: ComponentFixture<ForTimeTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForTimeTimerComponent]
    });
    fixture = TestBed.createComponent(ForTimeTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
