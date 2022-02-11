import { ILogin } from "src/app/core/interfaces/login.interface";
import User from "src/app/core/models/user.model";

export class LoginUser {
    static readonly type = '[Auth] Login User';
    constructor(public payload: ILogin) {}
}

export class StoreUser {
    static readonly type = '[Auth] Store User';
    constructor(public payload: User) {}
}

export class LogoutUser {
    static readonly type = '[Auth] Logout User';
}

