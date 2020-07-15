import { TestBed } from '@angular/core/testing';

import { Login1Guard } from './login1.guard';

describe('Login1Guard', () => {
  let guard: Login1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Login1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
