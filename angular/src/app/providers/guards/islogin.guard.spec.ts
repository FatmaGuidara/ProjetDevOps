import { TestBed } from '@angular/core/testing';

import { IsloginGuard } from './islogin.guard';

describe('IsloginGuard', () => {
  let guard: IsloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
