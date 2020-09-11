import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {User} from '../store/models/user.model';
import {AddUser} from '../store/actions/user.actions';
// import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
  });

  public hide = true;
  public user: User;
  public environment = environment.urlUser;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromReducer.users.State>,
    // private http: HttpClient,
    ){}

  // public addUser(): void {
  //   // console.log(this.form.getRawValue());
  //   this.store.dispatch(new AddUser(this.form.getRawValue()));
  // }

  public addUser(): void {
    // console.log(this.form.getRawValue());
    // this.http.get(this.environment, this.form.getRawValue()).subscribe(() => {
        this.store.dispatch(new AddUser(this.form.getRawValue()));
    //   }
    // );
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

  ngOnInit(): void{
  }

}
