import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginUser, LogoutUser, StoreUser } from './auth.actions';
import { RolesEnum } from 'src/app/core/enums/roles.enum';

import User from 'src/app/core/models/user.model';

import jwt_decode from "jwt-decode";
import { ITokenResponse } from 'src/app/core/interfaces/token.response.interface';

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

    @Selector()
    static loggedIn(state: AuthStateModel) {
        return !!state.user;
    }
    
    @Action(LoginUser)
    loginUser(ctx: StateContext<AuthStateModel>, action: LoginUser) {
        return this.authService.loginUser(action.payload)
            .pipe(
                tap({
                    next: (result: ITokenResponse) => {
                        localStorage.setItem('token', result.token);
                        
                        const user: User = jwt_decode(result.token);
                        ctx.dispatch(new StoreUser(user));
    
                        const redirectUrl = user.role === RolesEnum.Admin ? 'admin/dashboard' : '/'
                        ctx.dispatch(new Navigate([redirectUrl]));
                    },
                    error: (err)  => console.log(err)
                })
            )
    }

    @Action(StoreUser)
    storeUser(ctx: StateContext<AuthStateModel>, action: StoreUser) {
        ctx.patchState({
            user: action.payload
        });
    }

    @Action(LogoutUser)
    logoutUser(ctx: StateContext<AuthStateModel>) {
        localStorage.removeItem('token');

        ctx.patchState({
            user: null!
        });

        ctx.dispatch(new Navigate(['auth/login']));
    }
}