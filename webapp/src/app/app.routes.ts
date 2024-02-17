import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TimerComponent } from './pages/timer/timer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'timer', component: TimerComponent },
];
