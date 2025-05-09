import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService); // Lấy instance của TokenService
  const token = tokenService.getToken(); // Lấy token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
