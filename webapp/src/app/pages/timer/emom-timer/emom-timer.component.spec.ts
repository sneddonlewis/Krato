import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmomTimerComponent } from './emom-timer.component';

describe('EmomTimerComponent', () => {
  let component: EmomTimerComponent;
  let fixture: ComponentFixture<EmomTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmomTimerComponent]
    });
    fixture = TestBed.createComponent(EmomTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
