import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public tokenStorageService: TokenStorageService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.tokenStorageService.isTokenExpired()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
