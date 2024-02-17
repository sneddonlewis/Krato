import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmrapTimerComponent } from './amrap-timer.component';

describe('AmrapTimerComponent', () => {
  let component: AmrapTimerComponent;
  let fixture: ComponentFixture<AmrapTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmrapTimerComponent]
    });
    fixture = TestBed.createComponent(AmrapTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
