import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  generalError: string | null = null;
  validationErrors: any = {};
  passwordMismatch: boolean = false;

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.checkPasswords();
    if (!this.passwordMismatch) {
      this.authService.register(this.user).subscribe(
        (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['list']);
        },
        (error) => {
          if (error.status === 422 && error.error.errors) {
            this.validationErrors = error.error.errors;
          }
          else if (error.error.message) {
            this.generalError = error.error.message;
          }
          else {
            this.generalError = 'An error occurred while logging in. Try again.';
          }
        }
      );
    }
  }

  checkPasswords(): void {
    if (this.user.password && this.user.password_confirmation) {
      if (this.user.password !== this.user.password_confirmation) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
