import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWorkout, NewWorkout } from '../workout.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkout for edit and NewWorkoutFormGroupInput for create.
 */
type WorkoutFormGroupInput = IWorkout | PartialWithRequiredKeyOf<NewWorkout>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWorkout | NewWorkout> = Omit<T, 'time'> & {
  time?: string | null;
};

type WorkoutFormRawValue = FormValueOf<IWorkout>;

type NewWorkoutFormRawValue = FormValueOf<NewWorkout>;

type WorkoutFormDefaults = Pick<NewWorkout, 'id' | 'time'>;

type WorkoutFormGroupContent = {
  id: FormControl<WorkoutFormRawValue['id'] | NewWorkout['id']>;
  repetitions: FormControl<WorkoutFormRawValue['repetitions']>;
  negatives: FormControl<WorkoutFormRawValue['negatives']>;
  time: FormControl<WorkoutFormRawValue['time']>;
  exercise: FormControl<WorkoutFormRawValue['exercise']>;
  appUser: FormControl<WorkoutFormRawValue['appUser']>;
};

export type WorkoutFormGroup = FormGroup<WorkoutFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkoutFormService {
  createWorkoutFormGroup(workout: WorkoutFormGroupInput = { id: null }): WorkoutFormGroup {
    const workoutRawValue = this.convertWorkoutToWorkoutRawValue({
      ...this.getFormDefaults(),
      ...workout,
    });
    return new FormGroup<WorkoutFormGroupContent>({
      id: new FormControl(
        { value: workoutRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      repetitions: new FormControl(workoutRawValue.repetitions),
      negatives: new FormControl(workoutRawValue.negatives),
      time: new FormControl(workoutRawValue.time),
      exercise: new FormControl(workoutRawValue.exercise),
      appUser: new FormControl(workoutRawValue.appUser),
    });
  }

  getWorkout(form: WorkoutFormGroup): IWorkout | NewWorkout {
    return this.convertWorkoutRawValueToWorkout(form.getRawValue() as WorkoutFormRawValue | NewWorkoutFormRawValue);
  }

  resetForm(form: WorkoutFormGroup, workout: WorkoutFormGroupInput): void {
    const workoutRawValue = this.convertWorkoutToWorkoutRawValue({ ...this.getFormDefaults(), ...workout });
    form.reset(
      {
        ...workoutRawValue,
        id: { value: workoutRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkoutFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      time: currentTime,
    };
  }

  private convertWorkoutRawValueToWorkout(rawWorkout: WorkoutFormRawValue | NewWorkoutFormRawValue): IWorkout | NewWorkout {
    return {
      ...rawWorkout,
      time: dayjs(rawWorkout.time, DATE_TIME_FORMAT),
    };
  }

  private convertWorkoutToWorkoutRawValue(
    workout: IWorkout | (Partial<NewWorkout> & WorkoutFormDefaults)
  ): WorkoutFormRawValue | PartialWithRequiredKeyOf<NewWorkoutFormRawValue> {
    return {
      ...workout,
      time: workout.time ? workout.time.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
