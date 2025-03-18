import { TestBed } from '@angular/core/testing';

import { TbusertypeService } from './tbusertype.service';

describe('TbusertypeService', () => {
  let service: TbusertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbusertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
