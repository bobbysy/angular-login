import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/camelcase
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../authentication/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AppConfig } from '../config/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: Record<string, string> = {};

  isLoggedIn = false;

  isLoginFailed = false;

  errorMessage = '';

  username: string;

  domain = AppConfig.settings ? AppConfig.settings.domain : '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).then(
      (data) => {
        // Local session
        this.tokenStorage.generateToken(data);

        const myJwt = jwt_decode(data.token);
        const expiresAt = moment.unix(myJwt.exp);
        const expiryDate = expiresAt.toDate();

        // Global session
        this.cookieService.set(
          'JSESSIONID',
          data.token,
          expiryDate,
          '/',
          this.domain,
          false,
          'Lax'
        );

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
