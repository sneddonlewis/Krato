import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'kt-add-workout-dialog',
  templateUrl: './add-workout-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
})
export class AddWorkoutDialogComponent {}

// interface Workout {
//   id: string;
//   repetitions: number;
//   exercise: {
//     name: string;
//   };
//   time: Date;
// }
