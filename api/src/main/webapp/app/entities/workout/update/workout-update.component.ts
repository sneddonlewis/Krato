import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WorkoutFormService, WorkoutFormGroup } from './workout-form.service';
import { IWorkout } from '../workout.model';
import { WorkoutService } from '../service/workout.service';
import { IExercise } from 'app/entities/exercise/exercise.model';
import { ExerciseService } from 'app/entities/exercise/service/exercise.service';
import { IAppUser } from 'app/entities/app-user/app-user.model';
import { AppUserService } from 'app/entities/app-user/service/app-user.service';

@Component({
  selector: 'jhi-workout-update',
  templateUrl: './workout-update.component.html',
})
export class WorkoutUpdateComponent implements OnInit {
  isSaving = false;
  workout: IWorkout | null = null;

  exercisesSharedCollection: IExercise[] = [];
  appUsersSharedCollection: IAppUser[] = [];

  protected readonly editForm;

  constructor(
    protected workoutService: WorkoutService,
    protected workoutFormService: WorkoutFormService,
    protected exerciseService: ExerciseService,
    protected appUserService: AppUserService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.editForm = this.workoutFormService.createWorkoutFormGroup();
  }

  compareExercise = (o1: IExercise | null, o2: IExercise | null): boolean => this.exerciseService.compareExercise(o1, o2);

  compareAppUser = (o1: IAppUser | null, o2: IAppUser | null): boolean => this.appUserService.compareAppUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workout }) => {
      this.workout = workout;
      if (workout) {
        this.updateForm(workout);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workout = this.workoutFormService.getWorkout(this.editForm);
    if (workout.id !== null) {
      this.subscribeToSaveResponse(this.workoutService.update(workout));
    } else {
      this.subscribeToSaveResponse(this.workoutService.create(workout));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkout>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(workout: IWorkout): void {
    this.workout = workout;
    this.workoutFormService.resetForm(this.editForm, workout);

    this.exercisesSharedCollection = this.exerciseService.addExerciseToCollectionIfMissing<IExercise>(
      this.exercisesSharedCollection,
      workout.exercise
    );
    this.appUsersSharedCollection = this.appUserService.addAppUserToCollectionIfMissing<IAppUser>(
      this.appUsersSharedCollection,
      workout.appUser
    );
  }

  protected loadRelationshipsOptions(): void {
    this.exerciseService
      .query()
      .pipe(map((res: HttpResponse<IExercise[]>) => res.body ?? []))
      .pipe(
        map((exercises: IExercise[]) => this.exerciseService.addExerciseToCollectionIfMissing<IExercise>(exercises, this.workout?.exercise))
      )
      .subscribe((exercises: IExercise[]) => (this.exercisesSharedCollection = exercises));

    this.appUserService
      .query()
      .pipe(map((res: HttpResponse<IAppUser[]>) => res.body ?? []))
      .pipe(map((appUsers: IAppUser[]) => this.appUserService.addAppUserToCollectionIfMissing<IAppUser>(appUsers, this.workout?.appUser)))
      .subscribe((appUsers: IAppUser[]) => (this.appUsersSharedCollection = appUsers));
  }
}
