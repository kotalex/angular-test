import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { TasksService } from 'src/app/core/services/tasks.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { GetTasks } from 'src/app/store/tasks/tasks.actions';
import { TasksState } from 'src/app/store/tasks/tasks.state';
import Task from 'src/app/core/models/task.model';
import { CreateEditTaskDialogComponent } from '../create-edit-task-dialog/create-edit-task-dialog.component';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Select(TasksState.tasks)
  tasks$!: Observable<Task[]>;

  loaded!: boolean;

  columns: string[] = [
    'Name',
    'User',
    'Description'
  ];
  
  displayedColumns: string[] = [
    'name',
    'userName',
    'description'
  ];

  addButton = {
    link: 'create',
    text: 'Add Task'
  }

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    const loaded = this.store.selectSnapshot(TasksState.loaded);
    
    if (!loaded) {
      this.store.dispatch(new GetTasks());
    }
  }

  createTask() {
    this.dialog.open(CreateEditTaskDialogComponent, {
      width: '300px',
      data: {
        title: 'New Task',
        task: null
      }
    });
  }

  editTask(task: Task) {
    this.dialog.open(CreateEditTaskDialogComponent, {
      width: '300px',
      data: {
        title: `Editing task: ${task.name}`,
        task
      }
    });
  }

  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you wish to delete this task?'
      }
    })
    
    dialogRef.afterClosed()
      .pipe(first())
      .subscribe((confirmed) => {
        if (confirmed) {
          this.tasksService.deleteTask(taskId)
            .pipe(first())
            .subscribe(() => {
              this.snack.open('Task deleted successfully', 'x', {
                duration: 3000,
                panelClass: 'success-snackbar'
              });

              this.store.dispatch(new GetTasks());
            });
        }
      });
  }
}
