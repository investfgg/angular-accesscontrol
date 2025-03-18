import { TestBed } from '@angular/core/testing';

import { TbuserService } from './tbuser.service';

describe('TbuserService', () => {
  let service: TbuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
