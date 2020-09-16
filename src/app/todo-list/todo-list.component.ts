import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {HttpClient} from '@angular/common/http';
import {SetTodoTitle, DeleteTodo, GetToken, UpdateTodo} from '../store/actions/todo.actions';
import {getTodoSelector} from '../store/selectors/todo.selector';
import {filter} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from '../store/models/user.model';
import {getUserSelector} from '../store/selectors/user.selector';
import {ApiService} from '../services/api.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todoList: Todo[];
  public todoList$ = this.store.pipe(select(getTodoSelector), filter(Boolean));
  public todoTitle: string;
  public editing: boolean;
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
    this.editing = false;

    this.subscribes.push(

      this.user$.subscribe( (user: User) => {
        this.user = user;
         if(user.token){
           this.store.dispatch(new GetToken(user.token));
         }
      }),

      // fixme
      this.todoList$.subscribe((todoList: Todo[]) => {
        this.todoList = this.todosFiltered(todoList);
      })
    );
  }

  public ngOnDestroy() {
    this.subscribes.map((s) => s.unsubscribe());
  }

  public addTodo(): void {
    if (this.todoTitle.trim().length !== 0) {
      this.store.dispatch(new SetTodoTitle({
         title:  this.todoTitle,
        token: this.user.token
      }))
    }
    this.todoTitle = '';
  }


  public editTodo(todo: Todo): void {
    const alreadyEditingTodos = this.todoList.filter((todo) => todo.hasOwnProperty('tempTitle'));

    if (alreadyEditingTodos.length) {
      alreadyEditingTodos.forEach((todo) => {
        this.cancelEdit(todo);
      });
    }

    this.todoList = this.todoList.map( (item) => {
      if (item.id === todo.id) {
        return { ...item, tempTitle: item.title};
      }
      return item;
    } );

  }

  public cancelEdit(todo: Todo): void {
    this.todoList = this.todoList.map( (item) => {
      if (item.id === todo.id) {
        const {tempTitle, ...newItem} = item;
        return newItem;
      }
      return item;
    } );
  }

  public doneEdit(todo: Todo): void {

    console.log("doneEdit ---- todo", todo);

    // todo dispatch
    this.store.dispatch(new UpdateTodo({
      todo:  todo,
      token: this.user.token
    })
    )
  }

  public deleteTodo(todo: Todo): void {
    this.store.dispatch(new DeleteTodo({
      todo:  todo,
      token: this.user.token
    })
    )
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
