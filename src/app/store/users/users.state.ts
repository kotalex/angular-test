import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetUsers, GetUsersSuccess, GetUsersFail } from './users.actions';

import { tap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import User from 'src/app/core/models/user.model';

export interface UsersStateModel {
    list: User[];
    single?: User;
    loading: boolean;
    loaded: boolean;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    list: [],
    single: undefined,
    loading: false,
    loaded: false
  }
})
@Injectable()
export class UsersState {
    constructor(private usersService: UsersService) {}

    @Selector() 
    static users(state: UsersStateModel) {
        return state.list;
    }

    @Selector() 
    static loaded(state: UsersStateModel) {
        return state.loaded;
    }

    @Action(GetUsers)
    getUsers(ctx: StateContext<UsersStateModel>) {
        ctx.patchState({ loading: true });

        return this.usersService.getUsers()
            .pipe(
                tap({
                    next: result => ctx.dispatch(new GetUsersSuccess(result)),
                    error: () => ctx.dispatch(new GetUsersFail())
                })
            );
    }

    @Action(GetUsersSuccess)
    getUsersSuccess(ctx: StateContext<UsersStateModel>, action: GetUsersSuccess) {
        ctx.patchState({
            list: action.payload,
            loading: false,
            loaded: true
        });
    }

    @Action(GetUsersFail)
    getUsersFail(ctx: StateContext<UsersStateModel>) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
}