import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'create',
    component: CreateEditUserComponent
  },
  {
    path: ':id/edit',
    component: CreateEditUserComponent,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
