import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForTimeTimerComponent } from './for-time-timer/for-time-timer.component';

@Component({
  selector: 'kt-timer',
  standalone: true,
  imports: [CommonModule, ForTimeTimerComponent],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

}
