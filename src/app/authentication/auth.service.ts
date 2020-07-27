import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_API = AppConfig.settings ? AppConfig.settings.AUTH_API : '';

  constructor(private http: HttpClient) {}

  login(credentials): Promise<any> {
    return this.http
      .post(
        `${this.AUTH_API}signin`,
        {
          username: credentials.username,
          password: credentials.password,
        },
        httpOptions
      )
      .toPromise();
  }

  register(user): Promise<any> {
    return this.http
      .post(
        `${this.AUTH_API}signup`,
        {
          username: user.username,
          password: user.password,
        },
        httpOptions
      )
      .toPromise();
  }

  logout(user): Promise<any> {
    return this.http
      .post(
        `${this.AUTH_API}signout`,
        {
          username: user.username,
        },
        httpOptions
      )
      .toPromise();
  }

  verify(token): Promise<any> {
    return this.http
      .post(
        `${this.AUTH_API}verify`,
        {
          token,
        },
        httpOptions
      )
      .toPromise();
  }
}
