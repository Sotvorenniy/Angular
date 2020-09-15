import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {HttpClient} from '@angular/common/http';
import {AddTodo, DeleteTodo, GetTodo} from '../store/actions/todo.actions';
import {getTodoSelector} from "../store/selectors/todo.selector";
import {filter} from "rxjs/operators";
import {environment} from '../../environments/environment';
import {User} from "../store/models/user.model";
import {getUserSelector} from "../store/selectors/user.selector";
import {ApiService} from "../services/api.service";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todoList: Todo[];
  public todoList$ = this.store.pipe(select(getTodoSelector), filter(Boolean));
  public todoTitle: string;
  public idForTodo: number;
  public beforeEditCache: string;
  public filter: string;
  public value = 'Очистить';
  public subscribes = [];
  public user: User;
  public environment = environment.url;


  public user$ = this.store.pipe(select(getUserSelector), filter(Boolean));
  constructor(
    private store: Store<fromReducer.todos.State>,
    private http: HttpClient,
    private apiService: ApiService,
  ) { }



  public ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';

    this.subscribes.push(

      this.user$.subscribe( (user: User) => {
        this.user= user;
         if(user.token){
           this.store.dispatch(new GetTodo(user.token));
         }
      }),

      this.todoList$.subscribe((todoList) => {
        // console.log('todoList$',todoList);
        this.todoList = this.todosFiltered(todoList);
      })
    );
  }

  public ngOnDestroy() {
    this.subscribes.map((s) => s.unsubscribe());
  }

  public addTodo(): void {

    if (this.todoTitle.trim().length !== 0) {
      this.store.dispatch(new AddTodo({
         title:  this.todoTitle,
        token: this.user.token
      }))
    }
    this.todoTitle = '';
  }


  public editTodo(todo: Todo): void {

    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  public doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }
  }

  public cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  public deleteTodo(todo: Todo): void {
    console.log(todo);
    this.todoList$.subscribe((todo: Todo) => {this.store.dispatch(new DeleteTodo({
      todo:  todo,
      token: this.user.token
    }
    )
    )
    })
  }

  public todosFiltered(todoList): Todo[] {
    if (this.filter === 'all') {
      return todoList;
    } else if (this.filter === 'active') {
      return todoList.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return todoList.filter(todo => todo.completed);
    }

    return todoList;
  }
}
