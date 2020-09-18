import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Todo} from "../store/models/todo.model";

// const httpOptions = {
//   headers: new HttpHeaders(localStorage.getItem("token")),
// };

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  public login(user): Observable<any>{
    // window.localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(`${environment.url}/users/login`, user);
  }

  public getTodos(): Observable<Todo> {
    const token = window.localStorage.getItem('token');
    return this.http.get<Todo>(`${environment.url}/todo-list`, {headers: { token } });
  };

  public addTodo(data): Observable<Todo>{
    const token = window.localStorage.getItem('token');
    return this.http.post<Todo>(`${environment.url}/todo-list`, {title: data.title , completed: false}, {headers: { token } });
  }

  public deleteTodo(data): Observable<Todo>{
    const id = typeof data.todo === 'number' ? data.todo : data.todo.id;
    const token = window.localStorage.getItem('token');
    return this.http.delete<Todo>(`${environment.url}/todo-list/${id}`,  {headers: { token } });
  }

  public updateTodo(data): Observable<any> {
    const token = window.localStorage.getItem('token');
    const id = typeof data.todo === 'number' ? data.todo : data.todo.id;

    return this.http.put(`${environment.url}/todo-list/${id}`, {title: data.todo.tempTitle }, {headers: { token } });
  }

  public updateTodoCheck(data): Observable<any> {
    const token = window.localStorage.getItem('token');
    const id = typeof data.todo === 'number' ? data.todo : data.todo.id;

    return  this.http.put( `${environment.url}/todo-list/${id}`, {completed: !data.todo.completed}, {headers: {token}} );
  }

  public logout() {
   window.localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const token = window.localStorage.getItem('token');
    return !!token;
  }

}
