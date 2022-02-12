import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { first, Observable, of, switchMap } from 'rxjs';
import User from 'src/app/core/models/user.model';
import { GetUsers, SetSingleUser } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  @Select(UsersState.single) single$!: Observable<User>;

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const users: User[] = this.store.selectSnapshot(UsersState.users);

    if (!users.length) {
      return this.store.dispatch(new GetUsers())
        .pipe(
          first(),
          switchMap(() => {
            this.store.dispatch(new SetSingleUser(route.paramMap.get('id')));

            return this.store.selectOnce(UsersState.single);
          })
        );        
    } else {
      this.store.dispatch(new SetSingleUser(route.paramMap.get('id')));

      return this.store.selectOnce(UsersState.single);
    }
  }
}
