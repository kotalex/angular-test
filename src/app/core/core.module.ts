import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';


@NgModule({
  declarations: [],
  imports: [
    LayoutModule,
    SharedModule,
    CoreRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
