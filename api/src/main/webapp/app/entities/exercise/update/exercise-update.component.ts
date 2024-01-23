import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ExerciseFormService, ExerciseFormGroup } from './exercise-form.service';
import { IExercise } from '../exercise.model';
import { ExerciseService } from '../service/exercise.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-exercise-update',
  templateUrl: './exercise-update.component.html',
})
export class ExerciseUpdateComponent implements OnInit {
  isSaving = false;
  exercise: IExercise | null = null;
  editForm: ExerciseFormGroup;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected exerciseService: ExerciseService,
    protected exerciseFormService: ExerciseFormService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.editForm = this.exerciseFormService.createExerciseFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercise }) => {
      this.exercise = exercise;
      if (exercise) {
        this.updateForm(exercise);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('kratoApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exercise = this.exerciseFormService.getExercise(this.editForm);
    if (exercise.id !== null) {
      this.subscribeToSaveResponse(this.exerciseService.update(exercise));
    } else {
      this.subscribeToSaveResponse(this.exerciseService.create(exercise));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercise>>): void {
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

  protected updateForm(exercise: IExercise): void {
    this.exercise = exercise;
    this.exerciseFormService.resetForm(this.editForm, exercise);
  }
}
