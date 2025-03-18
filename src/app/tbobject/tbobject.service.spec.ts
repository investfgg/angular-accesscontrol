import { TestBed } from '@angular/core/testing';

import { TbobjectService } from './tbobject.service';

describe('TbobjectService', () => {
  let service: TbobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
