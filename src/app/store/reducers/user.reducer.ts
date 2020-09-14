import {
  EntityAdapter,
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';
import { User } from '../models/user.model';
import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State extends EntityState<User> {
  user: User;
  loaded: boolean;
  loading: boolean;
  error: any;
  selectedUserId: number;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  user: null,
  loaded: false,
  loading: false,
  selectedUserId: null,
  error: null,
});

export function reducer(state = initialState, action: UserActions): State {

  switch (action.type) {
    case UserActionTypes.userAddUser:
    case UserActionTypes.userGetUserById:
      console.log('userAddUser',action.payload);
      return {
        ...state,
        loading: true
      };

    case UserActionTypes.userGetUser:
    case UserActionTypes.userUpdateUser:
      return  {
        ...state,
        // user: action.payload,
        loading: true
      };

    case UserActionTypes.userAddUserSuccess:
      console.log('userAddUserSuccess',action.payload);
      return adapter.setAll([action.payload], {
        ...state,
        loading: false,
        loaded: true
      });

    // case UserActionTypes.userGetUserByIdSuccess:
    //   return { ...state, selectedUserId: action.payload.id, loading: false };

    case UserActionTypes.userGetUserSuccess:
      console.log('userGetUserSuccess',action.payload);
      return adapter.addOne(action.payload, {
        ...state,
        user: action.payload,
        loading: false,
        loaded: true
      });

    // case UserActionTypes.userUpdateUserSuccess: {
    //   return adapter.updateOne(
    //     {
    //       id: action.payload.id,
    //       changes: action.payload
    //     },
    //     {
    //       ...state,
    //       loading: false,
    //       loaded: true
    //     }
    //   );
    // }

    case UserActionTypes.userError:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const userEntitySelectors = adapter.getSelectors();

