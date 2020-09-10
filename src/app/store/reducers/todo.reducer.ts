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
    case TodoActionTypes.todoSetTodo:
      return {
        ...state,
        todo: action.payload,
        loading: true
      };

    case TodoActionTypes.todoAddTodo:
      return {
        ...state,
        todo: [...state.todo, action.payload],
        loading: true
      };

    case TodoActionTypes.todoDeleteTodo:
      return {
        ...state,
        todo: state.todo.filter((todo) => todo.id !== action.payload.id),
      };


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

