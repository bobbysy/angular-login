import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './shared/material-module';
import { AppConfig } from './config/app.config';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { authInterceptorProviders } from './authentication/auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectModule } from './redirect/redirect.module';
import { MatGridListResponsiveModule } from './shared/mat-grid-list-responsive/mat-grid-list-responsive.module';

export function initializeApp(appConfig: AppConfig): unknown {
  return (): Promise<void> => {
    return appConfig.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // Angular Material
    SharedMaterialModule,
    RedirectModule,
    MatGridListResponsiveModule,
  ],
  providers: [
    AppConfig,
    authInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
