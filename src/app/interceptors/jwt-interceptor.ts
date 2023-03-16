import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private version = 'api/v1';

  constructor(private http: HttpClient) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    request = request.clone({ url: `${this.version}${request.url}` });

    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloned);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.statusCode === 401) {
          return this.http
            .get<any>(`/auth/anonymous?platform=subscriptions`)
            .pipe(
              switchMap((response) => {
                localStorage.setItem('token', response.token);

                const cloned = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    `Bearer ${response.token}`
                  ),
                });

                return next.handle(cloned);
              })
            );
        } else {
          return throwError(() => new Error('Error!'));
        }
      })
    );
  }
}
