import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {User} from '../store/models/user.model';
import {Back} from '../store/actions/router.actions';
import {select, Store} from '@ngrx/store';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {getUserSelector} from '../store/selectors/user.selector';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddUser, UpdateUser} from '../store/actions/user.actions';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  public form = new FormGroup ({
    email: new FormControl('',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-Z!@#$%^&*]{6,}')]),
    login: new FormControl ('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]{2,60}')]),
    name: new FormControl ('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]{2,60}')]),
  });

  public  user: User;
  user$ = this.store.pipe(select(getUserSelector));
  constructor( private fb: FormBuilder, private store: Store<fromReducer.users.State> ) { }


  ngOnInit(): void {
    this.store.dispatch(new AddUser(JSON.parse(window.localStorage.getItem('user'))));
    this.user$.subscribe((user) => {

      this.user = user;

    });
  }

  public goBack(): void {
    this.store.dispatch(new Back());
  }

  public editUser(): void {
    this.store.dispatch(new UpdateUser(this.form.getRawValue()));
    this.goBack();
  }
}
