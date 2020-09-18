import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {User} from '../store/models/user.model';
import {AddUser, GetUser, GetUserSuccess, UserError} from '../store/actions/user.actions';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {getUserSelector} from "../store/selectors/user.selector";
import {catchError, exhaustMap, map} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../services/api.service";
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public subscribes = [];
  public user$ = this.store.pipe(select(getUserSelector));
  public hide = true;
  public user: User;

  public form = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private fb: FormBuilder,
    private store: Store<fromReducer.users.State>,
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    ){}

  public ngOnInit(): void{
    this.subscribes.push(
      this.user$.subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscribes.map((s) => s.unsubscribe());
  }

  public checkUser(): void {
    this.apiService.login(this.form.getRawValue()).subscribe(
      (user: User) => {
        this.store.dispatch(new GetUser(user));
        this.router.navigate(['todo-list']);
      },
      (error) => {
        this.store.dispatch(new UserError(error));
      }
    );
  }

  public getErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'Введите e-mail';
    }
    return this.form.get('email').hasError('pattern') ? 'Введите правильный e-mail' : '';
  }

  public getErrorMessagePass(): string {
    return  'Введите пароль';
  }


}
