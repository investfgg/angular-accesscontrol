import { TestBed } from '@angular/core/testing';

import { TbprofileService } from './tbprofile.service';

describe('TbprofileService', () => {
  let service: TbprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
