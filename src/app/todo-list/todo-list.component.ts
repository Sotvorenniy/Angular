import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {HttpClient} from '@angular/common/http';
import {AddTodo, DeleteTodo} from '../store/actions/todo.actions';
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
  public user_id: number | string;
  public value = 'Очистить';
  public subscribes = [];
  public user: User;
  public environment = environment.url;


  public  user$ = this.store.pipe(select(getUserSelector), filter(Boolean));
  constructor(
    private store: Store<fromReducer.todos.State>,
    private http: HttpClient,
    private apiService: ApiService
  ) { }



  public ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';

    this.subscribes.push(

      this.user$.subscribe( (user: User) => {
         if(user){
           this.getUserTodo(user.id)
         }

      })

      // this.http.get(this.environment, { headers: { user_id: "13" } }).subscribe((todoList: Todo[]) => {
      //   //` console.log("this.user_id", this.user_id);
      //   this.store.dispatch(new SetTodo(todoList));
      // }),
      //
      // this.todoList$.subscribe((todoList) => {
      //   this.todoList = this.todosFiltered(todoList);
      //   // console.log( this.todoList );
      // }),
    );
  }


  public getUserTodo(id){
    this.apiService.getOne(id).subscribe();
  }

  public ngOnDestroy() {
    this.subscribes.map((s) => s.unsubscribe());
  }

  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {

    }

    const newTodo = {
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    };

    // this.http.post(`${this.environment}/${this.user.id}`, newTodo).subscribe((todo: Todo) => {
    //   window.localStorage.setItem('todo', JSON.stringify(todo));
    //   this.store.dispatch(new AddTodo(todo));
    // });
    this.http.post(this.environment, newTodo).subscribe((todo: Todo) => {
      window.localStorage.setItem('todo', JSON.stringify(todo));
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
    this.http.delete(`${this.environment}/${todo.id}`, {}).subscribe((deletedTodo: Todo) => {
      this.store.dispatch(new DeleteTodo(deletedTodo));
    });
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
