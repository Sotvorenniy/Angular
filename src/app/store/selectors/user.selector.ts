import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import {userEntitySelectors} from '../reducers/user.reducer';
// @ts-ignore
// import * as fromReducers from '@appStore';


export const getUserStore = createFeatureSelector('users');

export const getUserSelector = createSelector(
  getUserStore,
  (state: any) => state.user

);



//
// export const getUserEntities = createSelector(
//   getUserStore,
//   fromReducers.user.userEntitySelectors.selectAll
// );
//
// export const getUser = createSelector(getUserEntities, entities => {
//   return Object.values(entities);
// });
//
// export const getUserLoaded = createSelector(
//   getUserStore,
//   (userStore: fromReducers.user.State) => userStore.loaded
// );
//
// export const getUserLoading = createSelector(
//   getUserStore,
//   (userStore: fromReducers.user.State) => userStore.loading
// );
//
// export const getSelectedUserId = createSelector(
//   getUserStore,
//   (userStore: fromReducers.user.State) => userStore.selectedUserId
// );
// //
// // export const getUserById = createSelector(
// //   getUserEntities,
// //   getSelectedUserId,
// //   (entities, id) => entities.find(i => i.id === id)
// // );
//
// export const getUserError = createSelector(
//   getUserStore,
//   (userStore: fromReducers.user.State) => userStore.error
// );
