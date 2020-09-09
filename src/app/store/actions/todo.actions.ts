import { Action } from '@ngrx/store';
import { Todo } from '../models/todo.model';


export enum TodoActionTypes {
  todoGetTodo = '[Todo] get',
  todoGetTodoSuccess = '[Todo] get todo success',
  todoAddTodo = '[Todo] add todo',
  todoAddTodoSuccess = '[Todo] add todo success',
  todoGetTodoById = '[Todo] get todo by id',
  todoGetTodoByIdSuccess = '[Todo] get todo by id success',
  todoUpdateTodo = '[Todo] update todo',
  todoUpdateTodoSuccess = '[Todo] update todo success',
  todoError = '[Todo] error'
};

export class GetTodo implements Action {
  readonly type = TodoActionTypes.todoGetTodo;

  constructor(public payload: Todo[]){}
}

export class GetTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoGetTodoSuccess;
  constructor(public payload: Todo) {}
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.todoAddTodo;

  constructor(public payload: Todo) {}
}

export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoAddTodoSuccess;
  constructor(public payload: Todo) {}
}

export class GetTodoById implements Action {
  readonly type = TodoActionTypes.todoGetTodoById;
  constructor(public payload: number) {}
}

export class GetTodoByIdSuccess implements Action {
  readonly type = TodoActionTypes.todoGetTodoByIdSuccess;
  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.todoUpdateTodo;
  constructor(public payload: Todo) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoUpdateTodoSuccess;
  constructor(public payload: Todo) {}
}


export class TodoError implements Action {
  readonly type = TodoActionTypes.todoError;
  constructor(public payload: any) {}
}

export type TodoActions =
  | GetTodo
  | GetTodoSuccess
  | AddTodo
  | AddTodoSuccess
  | GetTodoById
  | GetTodoByIdSuccess
  | UpdateTodo
  | UpdateTodoSuccess
  | TodoError;
