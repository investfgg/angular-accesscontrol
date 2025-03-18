import { TestBed } from '@angular/core/testing';

import { TbPermissionService } from './tbpermission.service';

describe('TbobjectService', () => {
  let service: TbPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});