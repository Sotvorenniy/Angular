import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import { map, catchError, exhaustMap} from 'rxjs/operators';
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
} from '../actions/user.actions';

import {ApiService} from "../../services/api.service";

@Injectable()
export class UserEffects {


   login$ = createEffect(() => this.actions$.pipe(
    ofType<GetUser>(UserActionTypes.userGetUser),
    exhaustMap((action) =>
      this.apiService.login(action.payload).pipe(
        map((data: any) =>
          {
            // console.log('---login$----',data)
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

}

