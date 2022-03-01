import Task from "src/app/core/models/task.model";
import { userMock } from "./user.mock";

export const taskMock: Task = {
    _id: 'id',
    name: 'Test Task',
    description: 'Task description',
    userId: userMock._id,
    user: userMock,
    userName!: 'Test User'
};