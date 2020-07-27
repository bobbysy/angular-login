import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectService } from './redirect/redirect.service';
import { AuthGuardService as AuthGuard } from './authentication/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  // Not Found page with external link redirection
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [RedirectService],
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
