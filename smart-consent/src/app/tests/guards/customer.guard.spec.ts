import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from '../../security/guard/customer.guard';

describe('CustomerGuard', () => {
  let guard: CustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
