import { AuthState } from "./auth/auth.state";
import { TasksState } from "./tasks/tasks.state";
import { UsersState } from "./users/users.state";

export const AppState = [
    AuthState,
    UsersState,
    TasksState
];
