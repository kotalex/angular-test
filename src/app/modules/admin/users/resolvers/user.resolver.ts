import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import User from 'src/app/core/models/user.model';
import { SetSingleUser } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  @Select(UsersState.single) single$!: Observable<User>;

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    this.store.dispatch(new SetSingleUser(route.paramMap.get('id')));

    return this.store.selectOnce(UsersState.single);
  }
}
