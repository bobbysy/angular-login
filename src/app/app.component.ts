import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './services/token-storage.service';
import { ThemeService } from './services/theme.service';
import { AuthService } from './authentication/auth.service';
import { AppConfig } from './config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private roles: string[];

  isLoggedIn = false;

  showAdminBoard = false;

  username: string;

  currentTheme: Observable<string>;

  isDark = false;

  domain = AppConfig.settings ? AppConfig.settings.domain : '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private cookieService: CookieService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.verifyGlobalSession();
    this.currentTheme = this.themeService.getThemeDynamic();
    this.isDark = this.themeService.isDarkMode();
  }

  verifyGlobalSession(): void {
    const cookieExists: boolean = this.cookieService.check('JSESSIONID');

    if (cookieExists) {
      this.authService
        .verify(this.cookieService.get('JSESSIONID'))
        .then((data) => {
          this.tokenStorageService.generateToken(data);
          this.isLoggedIn = !!this.tokenStorageService.getToken();
          this.onAutoLogon();
        });
    }
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.toggleDarkTheme(checked);
    this.isDark = !this.isDark;
  }

  logout(): void {
    this.authService.logout(this.tokenStorageService.getUser()).then(
      () => {
        this.cookieService.deleteAll();
        this.cookieService.delete('JSESSIONID', '/', this.domain, false, 'Lax');
        this.tokenStorageService.signOut();
        window.location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onAutoLogon(): void {
    if (this.isLoggedIn) {
      // Check token expiration
      if (!this.tokenStorageService.isTokenExpired()) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

        this.username = user.username;
      } else {
        this.logout();
      }
    }
  }
}
