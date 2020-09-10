import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {HttpClient} from '@angular/common/http';
import {AddTodo, DeleteTodo, SetTodo} from '../store/actions/todo.actions';
import {getTodoSelector} from "../store/selectors/todo.selector";



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];
  public todoUrl = 'http://localhost:3000/todo-list';
  todoList$ = this.store.pipe(select(getTodoSelector));

  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  value = 'Очистить';

  constructor(private store: Store<fromReducer.todos.State>, private http: HttpClient) {
  }

  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    const newTodo = {
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    };

    this.http.post(this.todoUrl, newTodo).subscribe((todo: Todo) => {
      this.store.dispatch(new AddTodo(todo));
    });

    this.todoTitle = '';
  }


  public editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  public doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  public cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  public deleteTodo(todo: Todo): void {
    this.http.delete(`${this.todoUrl}/${todo.id}`, {}).subscribe((deletedTodo: Todo) => {
      this.store.dispatch(new DeleteTodo(deletedTodo));
    });
  }

  public todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todoList;
    } else if (this.filter === 'active') {
      return this.todoList.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todoList.filter(todo => todo.completed);
    }
    return this.todoList;
  }

  ngOnInit(): void {

    this.http.get(this.todoUrl).subscribe((todoList: Todo[]) => {
      this.store.dispatch(new SetTodo(todoList));
    });

    this.todoList$.subscribe((todoList) => {
      this.todoList = todoList;
    });

    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';
  }
}
