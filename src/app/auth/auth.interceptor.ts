import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import UIkit from 'uikit';

import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
    constructor(public auth: AuthService) {}

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      UIkit.notification({
        message: err.message,
        status: 'warning',
        timeout: 3000
      });
      if (err.status === 401 || err.status === 403) {
          /*if(err.url?.includes("/auth")) {
              //window.location.href = environment.bffAuthorize;
          } else {
              this.alertService.showErrorAlert("Not authorized, please login!");
          }*/
          
          return of(err.message);
      }
      return throwError(() => err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(environment.applicationProtected) {
        this.auth.accessToken().subscribe(accessToken => {
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${accessToken}`
                }
              });
        });
        
    }
    return next.handle(request);
  }
}