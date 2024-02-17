import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartButtonComponent } from '../start-button/start-button.component';

@Component({
  selector: 'kt-for-time-timer',
  standalone: true,
  imports: [CommonModule, StartButtonComponent],
  templateUrl: './for-time-timer.component.html',
  styleUrls: ['./for-time-timer.component.scss']
})
export class ForTimeTimerComponent {

}
