import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'kt-start-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss']
})
export class StartButtonComponent implements OnDestroy {
  private subs: Subscription[] = []
  countDown = 10
  private countDown$ = interval(1000)
    .pipe(
      take(this.countDown - 1),
      map(value => this.countDown - value),
    )
  countDownDisplay = 'Go'

  constructor() {
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe())
  }

  startCountdown() {
    this.countDownDisplay = this.countDown.toString()
    const sub = this.countDown$
      .pipe(
        tap(num => this.countDownDisplay = (--num).toString())
      )
      .subscribe();
    this.subs.push(sub)
  }
}
