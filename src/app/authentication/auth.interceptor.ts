import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from '../services/token-storage.service';

// for Spring Boot back-end
const TOKEN_HEADER_KEY = 'Authorization';
// for Node.js Express back-end
// const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    // const token = this.token?.getToken();
    const cookieExists: boolean = this.cookieService.check('JSESSIONID');

    if (cookieExists) {
      authReq = req.clone({
        headers: req.headers.set(
          TOKEN_HEADER_KEY,
          `Bearer ${this.cookieService.get('JSESSIONID')}`
        ),
      });
    } else {
      const token = this.tokenStorageService?.getToken();

      if (token != null) {
        this.tokenStorageService.signOut();
        // authReq = req.clone({
        //   headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`),
        // });
      }
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
