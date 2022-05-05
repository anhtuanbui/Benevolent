import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, scheduled, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          if (error.status == 404) {
            this.showSnackBar(`${error.error.title} (${error.status})`);
          } else if (parseInt(error.status) < 500) {
            if (error.error.title) {
              this.showSnackBar(`${error.error.title} (${error.status})`);
            } else {
              this.showSnackBar(`${error.error} (${error.status})`);
            }
          } else if (parseInt(error.status) < 600) {
            this.showSnackBar(`Server error (${error.status})`);
          }
        }
        return throwError(() => console.log(error));
      })
    );
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      horizontalPosition: 'end',
      panelClass: ['snackbar'],
    });
  }
}
