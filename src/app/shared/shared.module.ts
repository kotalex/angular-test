import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  FormsModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
];


@NgModule({
  declarations: [],
  imports: modules,
  exports: [
    ...modules,
  ]  
})
export class SharedModule { }
