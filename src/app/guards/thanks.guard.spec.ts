import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { thanksGuard } from './thanks.guard';

describe('thanksGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => thanksGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
