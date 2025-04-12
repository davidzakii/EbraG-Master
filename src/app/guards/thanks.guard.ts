import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AgreementService } from '../services/agreement.service';

export const thanksGuard: CanActivateFn = (route, state) => {
  const agreementService = inject(AgreementService);
  const router = inject(Router);
  if (agreementService.getUserAgreement()) {
    router.navigate(['/home']);
    return true;
  } else {
    return false;
  }
};
