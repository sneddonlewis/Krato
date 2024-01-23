import { Injectable } from '@angular/core';
import { WorkoutService } from 'app/entities/workout/service/workout.service';
import { IWorkout } from 'app/entities/workout/workout.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyWorkoutService {
  readonly workoutsToday$;

  constructor(private workoutService: WorkoutService) {
    this.workoutsToday$ = this.setupWorkoutsPipeline();
  }

  private setupWorkoutsPipeline(): Observable<IWorkout[]> {
    return this.workoutService.query().pipe(
      map(r => (r.body !== null ? r.body : ([] as IWorkout[]))),
      map(workouts => {
        const today = new Date();
        return workouts.filter(workout => this.haveSameDate(today, new Date(workout.time!.toDate())));
      })
    );
  }

  private haveSameDate(a: Date, b: Date): boolean {
    return this.dateFromDatetime(a) === this.dateFromDatetime(b);
  }

  private dateFromDatetime(datetime: Date): string {
    return datetime.toISOString().split('T')[0];
  }
}
