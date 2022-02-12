import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { TasksService } from "src/app/core/services/tasks.service";
import { GetTasks, GetTasksFail, GetTasksSuccess } from "./tasks.actions";
import Task from "src/app/core/models/task.model";

export interface TasksStateModel {
    list: Task[];
    single: Task;
    loading: boolean;
    loaded: boolean;      
}

@State<TasksStateModel>({
    name: 'tasks',
    defaults: {
        list: [],
        single: null!,
        loading: false,
        loaded: false
    }
})
@Injectable()
export class TasksState {
    constructor(private tasksService: TasksService) {}

    @Selector() 
    static tasks(state: TasksStateModel) {
        return state.list;
    }

    @Selector()
    static single(state: TasksStateModel) {
        return state.single;
    }

    @Selector() 
    static loaded(state: TasksStateModel) {
        return state.loaded;
    }

    @Action(GetTasks)
    getTasks(ctx: StateContext<TasksStateModel>) {
        ctx.patchState({ loading: true });

        return this.tasksService.getTasks()
            .pipe(
                tap({
                    next: (result) => ctx.dispatch(new GetTasksSuccess(result)),
                    error: () => ctx.dispatch(new GetTasksFail())
                })
            )
    }

    @Action(GetTasksSuccess)
    getTasksSuccess(ctx: StateContext<TasksStateModel>, action: GetTasksSuccess) {
        const tasks: Task[] = action.payload.map((task) => {
            task.userName = `${task.user.firstName} ${task.user.lastName}`;
            return task;
        });

        ctx.patchState({
            list: tasks,
            loaded: true,
            loading: false,
        });
    }

    @Action(GetTasksFail)
    getTasksFail(ctx: StateContext<TasksStateModel>, action: GetTasksFail) {
        ctx.patchState({
            loaded: false,
            loading: false
        });
    }
}