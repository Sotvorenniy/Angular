// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
//
// import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
// import { of } from 'rxjs';
//
// import {
//   UserActionTypes,
//   GetUserSuccess,
//   UserError,
//   AddUser,
//   AddUserSuccess,
//   GetUserById,
//   GetUserByIdSuccess,
//   UpdateUserSuccess,
// } from '../actions/user.actions';
//
// import * as fromRouterActions from '../actions/router.actions';
//
// @Injectable()
// export class UserEffects {
//   constructor(private actions$: Actions) {}
//
//   @Effect()
//     // @ts-ignore
//   updateUserSuccess$ = this.actions$.pipe(
//     ofType(UserActionTypes.userUpdateUserSuccess),
//     map(hero => new fromRouterActions.Go({ path: ['/user-profile'] }))
//   );
// }
