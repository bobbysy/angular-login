import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = AppConfig.settings ? AppConfig.settings.API_URL : '';

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(`${this.API_URL}all`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.API_URL}admin`, { responseType: 'text' });
  }
}
