import { Injectable } from '@angular/core';
import {act, Actions, createEffect, Effect, ofType} from '@ngrx/effects';
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
  DeleteTodoSuccess, UpdateTodo, UpdateTodoSuccess, UpdateTodoCheck, UpdateTodoCheckSuccess
} from '../actions/todo.actions';

@Injectable()

export class TodoEffects {

  constructor(
    private apiService: ApiService,
    private actions$: Actions
  ) {
  }

  todo$ = createEffect(() => this.actions$.pipe(
    ofType<GetToken>(TodoActionTypes.todoGetToken),
    exhaustMap((action) =>
      this.apiService.getTodos().pipe(
        map((data: any) =>
          {
            // window.localStorage.setItem('todo', JSON.stringify(data));
            return new GetTodoSuccess(data)
          }
        ),
        catchError((response: any) =>
          of(new TodoError(response)),
        ),
      )
    ),
  ));


  todoDelete$ = createEffect( () => this.actions$.pipe(
    ofType<DeleteTodo>(TodoActionTypes.todoDeleteTodo),
    exhaustMap((action) =>
      this.apiService.deleteTodo(action.payload).pipe(
        map((data: any) =>
          {
            // console.log('---DeleteTodo----',data);
            return new DeleteTodoSuccess(data);
          }
        ),
        catchError((response: any) =>
          of(new TodoError(response)))
      ),
    )
  ));

  todoAdd$ = createEffect( () => this.actions$.pipe( // fixme
    ofType<SetTodoTitle>(TodoActionTypes.todoSetTitle),
    exhaustMap((action) => {
        return this.apiService.addTodo(action.payload).pipe(
          map((data: any) => {
            // console.log("---add_todo---", data);
            return new AddTodoSuccess(data)
          }),
          catchError((response: any) =>
            of(new TodoError(response)))
        )
      }
    )
  ))


  updateTodo$ = createEffect( () => this.actions$.pipe(
    ofType<UpdateTodo>( TodoActionTypes.todoUpdateTodo ),
    exhaustMap((action) =>{
      return this.apiService.updateTodo(action.payload).pipe(
        map((data:any) => {
          // console.log("EFFECT action.payload", action.payload)
          // console.log("EFFECT ------update_todo------", data );
          return new UpdateTodoSuccess(data) }),
        catchError((response:any) =>
          of(new TodoError(response)))
      )})
  ))

  updateTodoCheck$ = createEffect( () => this.actions$.pipe(
    ofType<UpdateTodoCheck> ( TodoActionTypes.todoUpdateTodoCheck),
    exhaustMap((action) => {
      return this.apiService.updateTodoCheck(action.payload).pipe(
        map((data:boolean) => {
          return new UpdateTodoCheckSuccess(data)
        }),
        catchError((response:any) =>
        of(new TodoError(response)))
      )
})
  ))

}
