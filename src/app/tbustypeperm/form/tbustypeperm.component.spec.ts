import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbUstypePermComponent } from './tbustypeperm.component';

describe( 'TbUstypePermComponent', () =>
{
  let component: TbUstypePermComponent;
  let fixture: ComponentFixture<TbUstypePermComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [ TbUstypePermComponent ]
    } ).compileComponents();
    
    fixture = TestBed.createComponent( TbUstypePermComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  } );
} );