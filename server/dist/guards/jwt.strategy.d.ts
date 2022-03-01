import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<User>;
}
export {};
