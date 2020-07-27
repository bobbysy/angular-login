import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/camelcase
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRES_AT = 'expires-at';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public signOut(): void {
    window.localStorage.clear();
  }

  private saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  private saveUser(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Record<string, any> {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  private saveExpiration(expiryMs: string): void {
    window.localStorage.removeItem(EXPIRES_AT);
    window.localStorage.setItem(EXPIRES_AT, expiryMs);
  }

  public getExpiration(): string {
    return localStorage.getItem(EXPIRES_AT);
  }

  public generateToken(data): void {
    this.saveToken(data.token);
    this.saveUser(data);
    const myJwt = jwt_decode(data.token);
    this.saveExpiration(myJwt.exp.toString());
  }

  public isTokenExpired(): boolean {
    // Check token expiration
    const expiresAt = moment.unix(Number(this.getExpiration()));

    return !moment().isBefore(expiresAt);
  }
}
