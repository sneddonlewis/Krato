import dayjs from 'dayjs/esm';
import { IExercise } from 'app/entities/exercise/exercise.model';
import { IAppUser } from 'app/entities/app-user/app-user.model';

export interface IWorkout {
  id: number;
  repetitions?: number | null;
  negatives?: number | null;
  time?: dayjs.Dayjs | null;
  exercise?: Pick<IExercise, 'id'> | null;
  appUser?: Pick<IAppUser, 'id'> | null;
}

export type NewWorkout = Omit<IWorkout, 'id'> & { id: null };
