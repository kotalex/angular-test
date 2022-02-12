import Task from "src/app/core/models/task.model";

export class GetTasks {
    static readonly type = '[Tasks] Get Tasks';
}

export class GetTasksSuccess {
    static readonly type = '[Tasks] Get Tasks Success';
    constructor(public payload: Task[]) {}
}

export class GetTasksFail {
    static readonly type = '[Tasks] Get Tasks Fail';
}
