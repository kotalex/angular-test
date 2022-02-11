import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginUser, StoreUser } from './auth.actions';
import { RolesEnum } from 'src/app/core/enums/roles.enum';

import User from 'src/app/core/models/user.model';

import jwt_decode from "jwt-decode";

export interface AuthStateModel {
    user: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null!,    
  }
})
@Injectable()
export class AuthState {
    constructor(
        private authService: AuthService
    ) {}

    @Selector() 
    static user(state: AuthStateModel) {
        return state.user;
    }
    
    @Action(LoginUser)
    loginUser(ctx: StateContext<AuthStateModel>, action: LoginUser) {
        this.authService.loginUser(action.payload)
            .pipe(
                tap((result: { token: string }) => {
                    localStorage.setItem('token', result.token);
                    
                    const user: User = jwt_decode(result.token);
                    ctx.dispatch(new StoreUser(user));

                    const redirectUrl = user.role === RolesEnum.Admin ? 'admin/dashboard' : '/'
                    ctx.dispatch(new Navigate([redirectUrl]));
                })
            )
    }

    @Action(StoreUser)
    storeUser(ctx: StateContext<AuthStateModel>, action: StoreUser) {
        ctx.patchState({
            user: action.payload
        });
    }
}