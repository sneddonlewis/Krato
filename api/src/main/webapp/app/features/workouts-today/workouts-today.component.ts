import { Component, OnInit, signal } from '@angular/core';
import { WorkoutService } from '../../entities/workout/service/workout.service';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import dayjs from 'dayjs/esm';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DailyWorkoutService } from '../workout/daily-workout.service';
import { WorkoutUpdateComponent } from 'app/entities/workout/update/workout-update.component';
import { WorkoutModule } from 'app/entities/workout/workout.module';
import { AddWorkoutDialogComponent } from './add-workout-dialog.component';

@Component({
  selector: 'kt-workouts-today',
  standalone: true,
  imports: [NgForOf, NgIf, AsyncPipe, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './workouts-today.component.html',
  styleUrls: ['./workouts-today.component.scss'],
})
export class WorkoutsTodayComponent {
  readonly workouts$;

  constructor(private workoutService: WorkoutService, public dialog: MatDialog, private dailyWorkoutService: DailyWorkoutService) {
    this.workouts$ = this.dailyWorkoutService.workoutsToday$;
  }

  addWorkoutDialog() {
    return this.dialog.open(AddWorkoutDialogComponent);
  }
}
