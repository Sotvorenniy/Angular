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
  constructor(
    private apiService: ApiService,
    private actions$: Actions
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType<GetUser>(UserActionTypes.userGetUser),
    map((action) => new GetUserSuccess(action.payload)
    ),
  ));
}

