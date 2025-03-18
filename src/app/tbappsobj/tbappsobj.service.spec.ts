import { TestBed } from '@angular/core/testing';

import { TbAppsObjService } from './tbappsobj.service';

describe( 'TbAppsObjService', () =>
{
  let service: TbAppsObjService;

  beforeEach( () =>
  {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( TbAppsObjService );
  } );

  it( 'should be created', () =>
  {
    expect( service ).toBeTruthy();
  } );
} );