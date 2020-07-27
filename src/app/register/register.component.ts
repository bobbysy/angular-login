import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: Record<string, string> = {};

  isSuccessful = false;

  isSignUpFailed = false;

  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register(this.form).then(
      () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
