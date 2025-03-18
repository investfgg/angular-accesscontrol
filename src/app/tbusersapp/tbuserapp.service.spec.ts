import { TestBed } from '@angular/core/testing';

import { TbuserappService } from './tbuserapp.service';

describe('TbuserappService', () => {
  let service: TbuserappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbuserappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
