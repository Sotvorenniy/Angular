import { Action } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export enum TodoActionTypes {
  todoSetTitle = '[Todo] set: title & token',
  todoAddTodoSuccess = '[Todo] add todo Success',
  todoAddTodo = '[Todo] add todo',
  todoGetTodoById = '[Todo] get todo by id',
  todoUpdateTodo = '[Todo] update todo',
  todoError = '[Todo] error',
  todoDeleteTodo = '[Todo] delete',
  todoGetToken = '[Todo] get token on login',
  todoGetTodoSuccess = '[Todo] get todo Success after login',
  todoDeleteTodoSuccess = '[Todo] delete todo success',
  todoUpdateTodoSuccess = '[Todo] update todo success',
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.todoAddTodo;

  constructor(public payload?: any) {}
}

export class GetToken implements Action {
  readonly type = TodoActionTypes.todoGetToken;

  constructor(public payload?: any) {}
}

export class GetTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoGetTodoSuccess;

  constructor(public payload?: any) {}
}

export class SetTodoTitle implements Action {
  readonly type = TodoActionTypes.todoSetTitle;
  constructor(public payload: any) {}
}

export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoAddTodoSuccess;
  constructor(public payload: Todo) {}
}


export class GetTodoById implements Action {
  readonly type = TodoActionTypes.todoGetTodoById;
  constructor(public payload: number) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.todoUpdateTodo;
  constructor(public payload: any) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoUpdateTodoSuccess;
  constructor(public payload: Todo) {}
}

export class DeleteTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoDeleteTodoSuccess;
  constructor(public payload: any) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.todoDeleteTodo;
  constructor(public payload: any) {}
}

export class TodoError implements Action {
  readonly type = TodoActionTypes.todoError;
  constructor(public payload: any) {}
}


export type TodoActions =
  | AddTodoSuccess
  | SetTodoTitle
  | GetTodoById
  | UpdateTodo
  | TodoError
  | GetToken
  | GetTodoSuccess
  | DeleteTodo
  | DeleteTodoSuccess
  | AddTodo
  | UpdateTodoSuccess;
