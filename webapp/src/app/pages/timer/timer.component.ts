import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForTimeTimerComponent } from './for-time-timer/for-time-timer.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AmrapTimerComponent } from './amrap-timer/amrap-timer.component';
import { EmomTimerComponent } from './emom-timer/emom-timer.component';

interface Timer {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'kt-timer',
  standalone: true,
  imports: [CommonModule, ForTimeTimerComponent, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, AmrapTimerComponent, EmomTimerComponent],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  timers: Timer[] = [
    {value: 'for-time-0', viewValue: 'For Time'},
    {value: 'emom-1', viewValue: 'EMOM'},
    {value: 'amrap-2', viewValue: 'AMRAP'},
  ];

  selectedValue?: string
}
