import dayjs from 'dayjs/esm';

import { IWorkout, NewWorkout } from './workout.model';

export const sampleWithRequiredData: IWorkout = {
  id: 88410,
};

export const sampleWithPartialData: IWorkout = {
  id: 42260,
  repetitions: 564,
  negatives: 23027,
  time: dayjs('2024-01-12T20:25'),
};

export const sampleWithFullData: IWorkout = {
  id: 85231,
  repetitions: 39460,
  negatives: 23556,
  time: dayjs('2024-01-13T08:16'),
};

export const sampleWithNewData: NewWorkout = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
