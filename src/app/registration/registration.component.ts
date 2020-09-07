import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../store/models/user.model';
import {Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {AddUser} from '../store/actions/user.actions';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  public form = new FormGroup ({
    email: new FormControl('',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-Z!@#$%^&*]{6,}')]),
    login: new FormControl ('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]{2,60}')]),
    name: new FormControl ('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]{2,60}')]),
  });

  public hide = true;

  public user: User;

  constructor(private fb: FormBuilder,
              private store: Store<fromReducer.users.State>,
              private http: HttpClient){}




  public getErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'Введите e-mail';
    }
    return this.form.get('email').hasError('pattern') ? 'Введите правильный e-mail' : '';
  }

  public getErrorMessageLog(): string {
    if (this.form.get('login').hasError('required')) {
      return 'Введите логин';
    }
    return this.form.get('login').hasError('pattern') ? 'Логин может содержать только латинские буквы' : '';
  }


  public getErrorMessageName(): string {
    if (this.form.get('name').hasError('required')) {
      return 'Введите имя';
    }
    return this.form.get('name').hasError('pattern') ? 'Имя может содержать только буквы' : '';
  }

  public getErrorMessagePass(): string {
    if (this.form.get('password').hasError('required')) {
      return 'Введите пароль';
    }
    return this.form.get('password').hasError('pattern') ? 'Пароль должен содержать латинские буквы и быть больше 6 символов' : '';
  }

  public addUser(): void {
    // this.store.dispatch(new AddUser(this.form.getRawValue()));
    this.http.post('http://localhost:3000/users', this.form.getRawValue()).subscribe((value: User) => {
      console.log('VALUE', value);
      window.localStorage.setItem('user', JSON.stringify(value));
      this.store.dispatch(new AddUser(value));
    });
  }


  ngOnInit(): void{

  }

}
