import { TestBed } from '@angular/core/testing';

import { TbApplicationService } from './tbapplication.service';

describe( 'TbApplicationService', () =>
{
  let service: TbApplicationService;

  beforeEach( () =>
  {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( TbApplicationService );
  } );

  it( 'should be created', () =>
  {
    expect( service ).toBeTruthy();
  } );
} );