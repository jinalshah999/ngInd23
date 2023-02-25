import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const isLoggedGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).isLoggedIn() || router.navigate(['no-access']);
};
