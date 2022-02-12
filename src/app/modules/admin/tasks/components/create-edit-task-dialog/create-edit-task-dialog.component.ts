import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { first } from 'rxjs';
import { Observable } from 'rxjs';
import Task from 'src/app/core/models/task.model';
import User from 'src/app/core/models/user.model';
import { TasksService } from 'src/app/core/services/tasks.service';
import { GetTasks } from 'src/app/store/tasks/tasks.actions';
import { GetUsers } from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';

@Component({
  selector: 'app-create-edit-task-dialog',
  templateUrl: './create-edit-task-dialog.component.html',
  styleUrls: ['./create-edit-task-dialog.component.scss']
})
export class CreateEditTaskDialogComponent implements OnInit {
  @Select(UsersState.users)
  users$!: Observable<User[]>;

  form!: FormGroup;
  task!: Task;

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    private store: Store,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<CreateEditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.task = this.data.task;

    const usersLoaded = this.store.selectSnapshot(UsersState.loaded);
    if (!usersLoaded) {
      this.store.dispatch(new GetUsers());
    }

    this.form = this.formBuilder.group({
      name: new FormControl(this.task ? this.task.name : '', [Validators.required]),
      description: new FormControl(this.task ? this.task.description : ''),
      userId: new FormControl(this.task ? this.task.user._id : '')
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    
    let response$: Observable<Task>;

    if (this.task) {
      response$ = this.tasksService.updateTask(this.task._id, this.form.value);      
    } else {
      response$ = this.tasksService.createTask(this.form.value);
    }

    response$.pipe(first())
      .subscribe(() => {
        this.store.dispatch(new GetTasks());

        this.snack.open(`Task ${this.task ? 'updated' : 'created'} successfully`, 'x', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });

        this.dialogRef.close();
      });
  }
}
