import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './i-app.config';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = response;
          resolve();
        })
        .catch((response: unknown) => {
          reject(
            new Error(
              `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
            )
          );
        });
    });
  }
}
