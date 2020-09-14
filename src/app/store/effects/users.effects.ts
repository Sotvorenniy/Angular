import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {switchMap, map, catchError, tap, debounceTime, exhaustMap} from 'rxjs/operators';
import { of } from 'rxjs';

import {
  UserActionTypes,
  AddUserSuccess,
  AddUser,
  UserError,
  GetUser,
  GetUserSuccess,
  GetUserById,
  GetUserByIdSuccess,
  UpdateUserSuccess,
  UserActions,
  GetUserTodo,
  GetUserTodoSuccess,
} from '../actions/user.actions';

import * as fromRouterActions from '../actions/router.actions';
import {ApiService} from "../../services/api.service";

@Injectable()
export class UserEffects {

  // @Effect()
  // updateUserSuccess$ = this.actions$.pipe(
  //   ofType(UserActionTypes.userUpdateUserSuccess),
  //   map(hero => new fromRouterActions.Go({ path: ['/user-profile'] }))
  // );


  @Effect()
   login$ = createEffect(() => this.actions$.pipe(
    ofType<GetUser>(UserActionTypes.userGetUser),
    exhaustMap((action) =>
      this.apiService.login(action.payload).pipe(
        map((data: any) =>
          {
            console.log('---login$----',data)
            return new GetUserSuccess(data)
          }
        ),
        catchError((response: any) =>
          of(new UserError(response)),
        ),
      )
    ),
  ));

  constructor(
    private apiService: ApiService,
    private actions$: Actions
  ) {
  }

  @Effect()
  todo$ = createEffect( () => this.actions$.pipe(
    ofType<GetUserTodo>(UserActionTypes.userGetUserTodo),
    exhaustMap((action) =>
    this.apiService.todo(action.payload).pipe(
      map((data:any) => {
        // console.log('@Effect()todo$',data)
        return new GetUserTodoSuccess(data)
      }),
      catchError((response: any) =>
      of(new UserError(response)),
      ),
     )
    ),
  ));
}

