import { IExercise, NewExercise } from './exercise.model';

export const sampleWithRequiredData: IExercise = {
  id: 13640,
};

export const sampleWithPartialData: IExercise = {
  id: 74250,
  name: 'bypass open-source',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IExercise = {
  id: 38541,
  name: 'Internal',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewExercise = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
