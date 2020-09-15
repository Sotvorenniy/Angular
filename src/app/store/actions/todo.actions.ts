import { Action } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import {UserActionTypes} from "./user.actions";

export enum TodoActionTypes {
  todoAddTodo = '[Todo] set',
  todoAddTodoSuccess = '[Todo] add todo',
  todoGetTodoById = '[Todo] get todo by id',
  todoUpdateTodo = '[Todo] update todo',
  todoError = '[Todo] error',
  todoDeleteTodo = '[Todo] delete',
  todoGetTodo = '[Todo] get todo',
  todoGetTodoSuccess = '[Todo] get todo Success',
  todoDeleteTodoSuccess = '[Todo] delete todo success'
};

export class GetTodo implements Action {
  readonly type = TodoActionTypes.todoGetTodo;

  constructor(public payload?: any) {}
}

export class GetTodoSuccess implements Action {
  readonly type = TodoActionTypes.todoGetTodoSuccess;

  constructor(public payload?: any) {}
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.todoAddTodo;
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
  | AddTodo
  | GetTodoById
  | UpdateTodo
  | TodoError
  | GetTodo
  | GetTodoSuccess
  | DeleteTodo
  | DeleteTodoSuccess;
