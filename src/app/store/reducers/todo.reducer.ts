import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Todo} from '../models/todo.model';
import {TodoActions, TodoActionTypes} from '../actions/todo.actions';

export interface State extends EntityState<Todo> {
  todo: Todo[];
  loaded: boolean;
  loading: boolean;
  error: any;
  selectedTodoId: number;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  todo: [],
  loaded: false,
  loading: false,
  selectedTodoId: null,
  error: null,
});

export function reducer(state = initialState, action: TodoActions): State {

  switch (action.type) {

    case TodoActionTypes.todoGetToken:
      return {
        ...state,
      };

    case TodoActionTypes.todoSetTitle:
      return {
        ...state
      };

    case TodoActionTypes.todoAddTodoSuccess:
      return {
    ...state,
      todo: [...state.todo, action.payload]
    };

    case TodoActionTypes.todoGetTodoSuccess:
      return {
        ...state,
        todo: action.payload
      };

    case TodoActionTypes.todoDeleteTodo:
      return adapter.removeOne(action.payload.todo.id, {
        ...state,
        todo: [...state.todo.filter((todo) => todo.id !== action.payload.todo.id)],
      });

    case TodoActionTypes.todoUpdateTodo:

      console.log( "REDUSER ___ _ _ todoUpdateTodo ----- action.payload", action.payload);
      console.log( "REDUSER ______ todoUpdateTodo ---- action.payload.tempTitle", action.payload.tempTitle);
      console.log( "REDUCER todoUpdateTodo action.payload.title", action.payload.title);
      console.log("REDUCEEER -----todoUpdateTodo------ action.payload.id", action.payload.id)

      return {
        ...state,
        // todo: [...state.todo.map( (todo) => todo.id == action.payload.todo.id) ]
      };

    case TodoActionTypes.todoUpdateTodoSuccess:

      console.log( "REDUSER ___ _ _ _todoUpdateTodoSuccess ----- action.payload", action.payload);
      console.log( "REDUSER ______ todoUpdateTodoSuccess ---- action.payload.tempTitle", action.payload.tempTitle);
      console.log( "REDUCER ______todoUpdateTodoSuccess action.payload.title", action.payload.title);
      console.log("REDUCEEER -----______todoUpdateTodoSuccess------ action.payload.id", action.payload.id)

      return {
        ...state,
        todo: [...state.todo]
      };

      //.map( (todo) => todo.id == action.payload.todo.id)

    case TodoActionTypes.todoError:
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

export const todoEntitySelectors = adapter.getSelectors();

