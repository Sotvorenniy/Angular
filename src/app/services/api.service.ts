import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Todo} from "../store/models/todo.model";



const httpOptions = {
  headers: new HttpHeaders(localStorage.getItem("token")),
};

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  public login(user): Observable<any>{
    window.localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(`${environment.url}/users/login`, user);
  }

  public getOne(id: number){
    return this.http.get(`${environment.url}/users/${id}`);
  }

  public getTodos(): Observable<Todo> {
    const token = window.localStorage.getItem('token');
    return this.http.get<Todo>(`${environment.url}/todo-list`, {headers: { token } });
  };

  public addTodo(data): Observable<Todo>{
    // console.log(data)
    return this.http.post<Todo>(`${environment.url}/todo-list`, {title: data.title}, {headers: { token: data.token } });
  }

  public deleteTodo(data): Observable<Todo>{
    const id = typeof data.todo === 'number' ? data.todo : data.todo.id;
    return this.http.delete<Todo>(`${environment.url}/todo-list/${id}`,  {headers: { token: data.token } });
    //{todo: data.todo}, add body
  }

  public updateTodo(data): Observable<any> {

    const id = typeof data.todo === 'number' ? data.todo : data.todo.id;

    console.log("data", data);
    console.log("id", id );
    console.log("data.todo", data.todo);
    console.log("data.todo.id", data.todo.id);
    console.log("data.token", data.token);

    return this.http.put(`${environment.url}/todo-list/${id}`, {headers: { token: data.token } });
  }
}
