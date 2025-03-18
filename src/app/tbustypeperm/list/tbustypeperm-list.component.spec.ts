import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbUstypePermListComponent } from './tbustypeperm-list.component';

describe( 'TbustypepermListComponent', () =>
{
  let component: TbUstypePermListComponent;
  let fixture: ComponentFixture<TbUstypePermListComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [TbUstypePermListComponent]
    } ).compileComponents();
    
    fixture = TestBed.createComponent( TbUstypePermListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  } );
} );