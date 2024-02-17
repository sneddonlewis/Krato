import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartButtonComponent } from '../start-button/start-button.component';

@Component({
  selector: 'kt-emom-timer',
  standalone: true,
  imports: [CommonModule, StartButtonComponent],
  templateUrl: './emom-timer.component.html',
  styleUrls: ['./emom-timer.component.scss']
})
export class EmomTimerComponent {

}
