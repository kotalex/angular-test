import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../modules/admin/admin.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MainModule } from '../modules/main/main.module';
import { RolesEnum } from './enums/roles.enum';
import { AuthGuard } from './guards/auth.guard';
import { RedirectIfAuthGuard } from './guards/redirect-if-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => AuthModule,
    canActivate: [RedirectIfAuthGuard]
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () => AdminModule,
    canActivate: [AuthGuard],
    data: { roles: [RolesEnum.Admin] }    
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => MainModule,
    canActivate: [AuthGuard],
    data: { roles: [RolesEnum.User] }
  },
  { 
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
