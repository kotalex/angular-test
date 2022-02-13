/// <reference types="mongoose" />
import { CreateUpdateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    list(req: any): import("mongoose").Query<(import("mongoose").Document<unknown, any, import("./schemas/task.schema").TaskDocument> & import("./schemas/task.schema").Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, import("./schemas/task.schema").TaskDocument> & import("./schemas/task.schema").Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/task.schema").TaskDocument>;
    create(dto: CreateUpdateTaskDto): Promise<import("mongoose").Document<unknown, any, import("./schemas/task.schema").TaskDocument> & import("./schemas/task.schema").Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, dto: CreateUpdateTaskDto): Promise<import("mongoose").Document<unknown, any, import("./schemas/task.schema").TaskDocument> & import("./schemas/task.schema").Task & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<void>;
}
