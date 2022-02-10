import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  {
    path: 'users',
    loadChildren: () => UsersModule
  },
  {
    path: 'tasks',
    loadChildren: () => TasksModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
