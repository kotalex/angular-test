import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

import { AlertComponent } from './components/alert/alert.component';
import { DataTableComponent } from './components/data-table/data-table.component';

const components = [
  AlertComponent,
  DataTableComponent
];

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  FormsModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatGridListModule
];


@NgModule({
  declarations: components,
  imports: modules,
  exports: [
    ...modules,
    ...components
  ],
  entryComponents: components
})
export class SharedModule { }
