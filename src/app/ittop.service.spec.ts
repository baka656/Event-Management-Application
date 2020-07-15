import { TestBed } from '@angular/core/testing';

import { IttopService } from './ittop.service';

describe('IttopService', () => {
  let service: IttopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IttopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
