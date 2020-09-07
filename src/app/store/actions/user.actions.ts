import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
  userGetUser = '[User] get',
  userGetUserSuccess = '[User] get user success',
  userAddUser = '[User] add user',
  userAddUserSuccess = '[User] add user success',
  userGetUserById = '[User] get user by id',
  userGetUserByIdSuccess = '[User] get user by id success',
  userUpdateUser = '[User] update user',
  userUpdateUserSuccess = '[User] update user success',
  userError = '[User] error'
}

export class GetUser implements Action {
  readonly type = UserActionTypes.userGetUser;
}

export class GetUserSuccess implements Action {
  readonly type = UserActionTypes.userGetUserSuccess;
  constructor(public payload: User) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.userAddUser;

  constructor(public payload: User) {}
}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.userAddUserSuccess;
  constructor(public payload: User) {}
}

export class GetUserById implements Action {
  readonly type = UserActionTypes.userGetUserById;
  constructor(public payload: number) {}
}

export class GetUserByIdSuccess implements Action {
  readonly type = UserActionTypes.userGetUserByIdSuccess;
  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.userUpdateUser;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.userUpdateUserSuccess;
  constructor(public payload: User) {}
}


export class UserError implements Action {
  readonly type = UserActionTypes.userError;
  constructor(public payload: any) {}
}

export type UserActions =
  | GetUser
  | GetUserSuccess
  | AddUser
  | AddUserSuccess
  | GetUserById
  | GetUserByIdSuccess
  | UpdateUser
  | UpdateUserSuccess
  | UserError;
