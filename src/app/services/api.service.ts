import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../store/models/user.model";
import {AddUser} from "../store/actions/user.actions";
import {FormBuilder} from "@angular/forms";

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  public login(user): Observable<any>{
    window.localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(`${environment.url}/users/login`, user);
  }

  public getOne(id: number){
    return this.http.get(`${environment.url}/users/${id}`);
  }

  public todo(todo): Observable<any> {
    window.localStorage.setItem('todo', JSON.stringify(todo));
    return this.http.get(`${environment.url}/users/${this.getOne}`)
  }

  // public registration(user): Observable<any> {
  //   window.localStorage.setItem('user', JSON.stringify(user));
  //   this.http.post(`${environment.url}/users/`, this.form.getRawValue()).subscribe((user: User) => {
  //   });
  // }
}
