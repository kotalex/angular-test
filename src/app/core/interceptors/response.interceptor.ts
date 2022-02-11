import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error);
        const message: string = error.status >= 500 ? 'Server error' : error.error.message;

        this.snackBar.open(message, 'x', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'error-snackbar'
        })

        return throwError(() => new Error(error.message))
      })
    );
  }
}
