import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateUpdateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';
export declare class TasksService {
    private taskModel;
    private readonly usersService;
    constructor(taskModel: Model<TaskDocument>, usersService: UsersService);
    getTasks(): import("mongoose").Query<(import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, TaskDocument>;
    getUserTasks(userId: string): import("mongoose").Query<(import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, TaskDocument>;
    createTask(dto: CreateUpdateTaskDto): Promise<import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateTask(id: string, dto: CreateUpdateTaskDto): Promise<import("mongoose").Document<unknown, any, TaskDocument> & Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteTask(id: any): Promise<boolean>;
}
