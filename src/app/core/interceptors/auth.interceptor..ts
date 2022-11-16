import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Base } from '@core/base/base-component';
import { CurrentUserService } from '@core/services/current-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _currentUser: CurrentUserService,
    private router: Router,
    private _base: Base
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = request.urlWithParams;
    // const timestamp = new Date().getTime().toString().slice(0, 10);

    const headers: any = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };

    const withoutAuth = request.headers.get('Without-Auth');

    if (withoutAuth) {
      return this.continueWithoutAuth(request, next, headers);
    }

    if (request.url.includes('Account')) {
      return this.continueWithoutAuth(request, next, headers);
    }

    const token = this._currentUser.getAuthToken();

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const newRequest = request.clone({ setHeaders: headers });
    const ifConnected = window.navigator.onLine;

    if (ifConnected) {
      return next.handle(newRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (newRequest.method != 'GET' && event['body']) {
                this._base.openSnackBar(event['body'].message);
              }
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              this.handleError(err, newRequest, next);
            }
          }
        ),
        catchError((e: any) => {
          return throwError(e);
        })
      );
    } else {
      this._base.openSnackBar('Internet not connected');
      return throwError({ message: 'Internet not connected' });
    }
  }

  private continueWithoutAuth(
    request: HttpRequest<any>,
    next: HttpHandler,
    globalHeaders: any
  ): Observable<any> {
    request = request.clone({
      setHeaders: globalHeaders,
    });
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (request.method != 'GET' && event['body']) {
              this._base.openSnackBar(event['body'].message);
            }
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err);
          }
        }
      )
    );
  }

  private handleError(
    error: HttpErrorResponse,
    newRequest?: HttpRequest<any>,
    next?: HttpHandler
  ) {
    if (error.error instanceof ErrorEvent || error.error.message) {
      this._base.openSnackBar(error.error?.message);
    } else {
      this._base.openSnackBar(error.statusText);
      if (error.status === 402) {
        this.router.navigate(['pay']);
      }
      if (error.status === 401) {
        this.router.navigate(['login']);
        // this.handleRefresh(newRequest!, next!);
      }
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }
}
