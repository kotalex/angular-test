import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTasks } from 'src/app/store/tasks/tasks.actions';
import { TasksState } from 'src/app/store/tasks/tasks.state';
import Task from 'src/app/core/models/task.model';
import { AuthState } from 'src/app/store/auth/auth.state';
import User from 'src/app/core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(TasksState.tasks)
  tasks$!: Observable<Task[]>

  @Select(AuthState.user)
  user$!: Observable<User>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetTasks());
  }
}
