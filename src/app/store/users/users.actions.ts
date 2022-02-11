import User from "src/app/core/models/user.model";

export class GetUsers {
    static readonly type = '[Users] Get Users';
    constructor(public payload?: any) {}
}

export class GetUsersSuccess {
    static readonly type = '[Users] Get Users Success';
    constructor(public payload: User[]) {}
}

export class GetUsersFail {
    static readonly type = '[Users] Get Users Fail';
    constructor() {}
}

export class SetSingleUser {
    static readonly type = '[Users] Set Single User';
    constructor(public payload: string | null) {}
}
