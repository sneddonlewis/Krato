import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'workout',
        data: { pageTitle: 'kratoApp.workout.home.title' },
        loadChildren: () => import('./workout/workout.module').then(m => m.WorkoutModule),
      },
      {
        path: 'exercise',
        data: { pageTitle: 'kratoApp.exercise.home.title' },
        loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule),
      },
      {
        path: 'app-user',
        data: { pageTitle: 'kratoApp.appUser.home.title' },
        loadChildren: () => import('./app-user/app-user.module').then(m => m.AppUserModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
