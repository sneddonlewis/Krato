import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartButtonComponent } from '../start-button/start-button.component';

@Component({
  selector: 'kt-amrap-timer',
  standalone: true,
  imports: [CommonModule, StartButtonComponent],
  templateUrl: './amrap-timer.component.html',
  styleUrls: ['./amrap-timer.component.scss']
})
export class AmrapTimerComponent {

}
