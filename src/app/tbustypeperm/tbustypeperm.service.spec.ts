import { TestBed } from '@angular/core/testing';

import { TbustypepermService } from './tbustypeperm.service';

describe('TbustypepermService', () => {
  let service: TbustypepermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbustypepermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
