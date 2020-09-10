import { createFeatureSelector, createSelector } from '@ngrx/store';


export const getTodoStore = createFeatureSelector('todos');

export const getTodoSelector = createSelector(
  getTodoStore,
  (state: any) => state.todo || []
);

