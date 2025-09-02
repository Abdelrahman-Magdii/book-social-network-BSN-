import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../token/token';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const token = tokenService.token;

  if (token && tokenService.isTokenValid()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("JWT Sent:", token);
    return next(authReq);
  }

  return next(req);
};
