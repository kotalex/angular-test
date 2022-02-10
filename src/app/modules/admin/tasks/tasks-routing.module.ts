import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditTaskComponent } from './components/create-edit-task/create-edit-task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent
  },
  {
    path: 'create',
    component: CreateEditTaskComponent
  },
  {
    path: ':id/edit',
    component: CreateEditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
