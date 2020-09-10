import { Action } from '@ngrx/store';
import { Todo } from '../models/todo.model';


export enum TodoActionTypes {
  todoSetTodo = '[Todo] set',
  todoAddTodo = '[Todo] add todo',
  todoGetTodoById = '[Todo] get todo by id',
  todoUpdateTodo = '[Todo] update todo',
  todoError = '[Todo] error',
  todoDeleteTodo = '[Todo] delete'
};

export class SetTodo implements Action {
  readonly type = TodoActionTypes.todoSetTodo;
  constructor(public payload: Todo[]){}
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.todoAddTodo;

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

export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.todoDeleteTodo;
  constructor(public payload: Todo) {}
}

export class TodoError implements Action {
  readonly type = TodoActionTypes.todoError;
  constructor(public payload: any) {}
}

export type TodoActions =
  | SetTodo
  | AddTodo
  | GetTodoById
  | UpdateTodo
  | TodoError
  | DeleteTodo;
