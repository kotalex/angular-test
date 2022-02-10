import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateEditTaskComponent } from './components/create-edit-task/create-edit-task.component';


@NgModule({
  declarations: [
    TasksListComponent,
    CreateEditTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
