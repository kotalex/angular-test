/// <reference types="mongoose" />
import { User } from 'src/modules/users/schemas/user.schema';
export declare type TaskDocument = Task & Document;
export declare class Task {
    name: string;
    description?: string;
    user?: User;
    createdAt: Date;
}
export declare const TaskSchema: import("mongoose").Schema<import("mongoose").Document<Task, any, any>, import("mongoose").Model<import("mongoose").Document<Task, any, any>, any, any, any>, any, any>;
