import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servers/services';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [
    CommonModule,
    CodeInputModule
  ],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss'
})
export class ActivateAccount {

  message = '';
  isOkay = true;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  // protected readonly skipUntil = skipUntil;
}
