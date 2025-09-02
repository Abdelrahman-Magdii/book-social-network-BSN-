import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../token/token';

export const authGuard: CanActivateFn = () => {

  const tokenService: Token = inject(Token);
  const router: Router = inject(Router);

  if (tokenService.isTokenNotValid()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
