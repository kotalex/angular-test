import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../modules/admin/admin.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MainModule } from '../modules/main/main.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => AuthModule
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () => AdminModule
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => MainModule
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
