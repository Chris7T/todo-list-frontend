import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  generalError: string | null = null;
  validationErrors: any = {};

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
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

