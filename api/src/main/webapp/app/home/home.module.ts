import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { WorkoutsTodayComponent } from '../features/workouts-today/workouts-today.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), WorkoutsTodayComponent, MatButtonModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
