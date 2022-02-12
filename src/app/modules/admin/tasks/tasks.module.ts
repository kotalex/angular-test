import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateEditTaskDialogComponent } from './components/create-edit-task-dialog/create-edit-task-dialog.component';


@NgModule({
  declarations: [
    TasksListComponent,
    CreateEditTaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
