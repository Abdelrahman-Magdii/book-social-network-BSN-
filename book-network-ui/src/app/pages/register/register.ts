import { Component } from '@angular/core';
import { RegistrationRequest } from '../../servers/models';
import { Router } from '@angular/router';
import { AuthService } from '../../servers/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.request({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }


}
