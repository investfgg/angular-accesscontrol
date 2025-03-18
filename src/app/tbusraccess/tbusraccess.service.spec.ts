import { TestBed } from '@angular/core/testing';

import { TbusraccessService } from './tbusraccess.service';

describe('TbusraccessService', () => {
  let service: TbusraccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbusraccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
