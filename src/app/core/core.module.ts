import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    LayoutModule,
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
