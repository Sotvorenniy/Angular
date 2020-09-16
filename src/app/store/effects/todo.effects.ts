import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, tap, debounceTime, exhaustMap} from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromRouterActions from '../actions/router.actions';
import {ApiService} from '../../services/api.service';
import {
  TodoActionTypes,
  SetTodoTitle,
  AddTodoSuccess,
  TodoError,
  GetToken,
  GetTodoSuccess,
  DeleteTodo,
  DeleteTodoSuccess, UpdateTodo, UpdateTodoSuccess
} from '../actions/todo.actions';

@Injectable()

export class TodoEffects {

  constructor(
    private apiService: ApiService,
    private actions$: Actions
  ) {
  }

  @Effect()
  todo$ = createEffect(() => this.actions$.pipe(
    ofType<GetToken>(TodoActionTypes.todoGetToken),
    exhaustMap((action) =>
      this.apiService.getTodos().pipe(
        map((data: any) =>
          {
            // console.log('---todo-list----',data)
            return new GetTodoSuccess(data)
          }
        ),
        catchError((response: any) =>
          of(new TodoError(response)),
        ),
      )
    ),
  ));

  @Effect()
  todoDelete$ = createEffect( () => this.actions$.pipe(
    ofType<DeleteTodo>(TodoActionTypes.todoDeleteTodo),
    exhaustMap((action) =>
  this.apiService.deleteTodo(action.payload).pipe(
    map((data: any) =>
{
  console.log('---DeleteTodo----',data);
  return new DeleteTodoSuccess(data);
}
),
catchError((response: any) =>
of(new TodoError(response)))
  ),
  )
));

  @Effect()
  todoAdd$ = createEffect( () => this.actions$.pipe(
    ofType<SetTodoTitle>(TodoActionTypes.todoSetTitle),
    exhaustMap((action) =>
    this.apiService.addTodo(action.payload).pipe(
      map((data:any) =>
      {
        // console.log("---add_todo---", data);
        return new AddTodoSuccess(data)
      }),
      catchError((response: any) =>
  of(new TodoError(response)))
    ))
  ))

  @Effect()
  updateTodo$ = createEffect( () => this.actions$.pipe(
    ofType<UpdateTodo>( TodoActionTypes.todoUpdateTodo ),
    exhaustMap((action) =>
    this.apiService.updateTodo(action.payload).pipe(
      map((data:any) => {
        console.log("------update_todo------", data );
        return new UpdateTodoSuccess(data) }),
    catchError((response:any) =>
    of(new TodoError(response)))
    ))
  ))

}
