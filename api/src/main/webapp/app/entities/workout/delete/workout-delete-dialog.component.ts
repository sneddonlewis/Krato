import { Component } from '@angular/core';

import { IWorkout } from '../workout.model';
import { WorkoutService } from '../service/workout.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './workout-delete-dialog.component.html',
})
export class WorkoutDeleteDialogComponent {
  workout?: IWorkout;

  constructor(protected workoutService: WorkoutService) {}

  cancel(): void {}

  confirmDelete(id: number): void {
    this.workoutService.delete(id).subscribe(() => {});
  }
}
