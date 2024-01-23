export interface IExercise {
  id: number;
  name?: string | null;
  description?: string | null;
}

export type NewExercise = Omit<IExercise, 'id'> & { id: null };
