import { Component } from '@angular/core';

import { IExercise } from '../exercise.model';
import { ExerciseService } from '../service/exercise.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './exercise-delete-dialog.component.html',
})
export class ExerciseDeleteDialogComponent {
  exercise?: IExercise;

  constructor(protected exerciseService: ExerciseService) {}

  cancel(): void {}

  confirmDelete(id: number): void {
    this.exerciseService.delete(id).subscribe(() => {});
  }
}
