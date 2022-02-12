/// <reference types="mongoose" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(): import("mongoose").Query<(import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[], import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, {}, import("./schemas/user.schema").UserDocument>;
    create(dto: CreateUserDto): Promise<import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: string): Promise<void>;
}
