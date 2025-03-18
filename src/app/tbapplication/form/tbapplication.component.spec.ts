import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbApplicationComponent } from './tbapplication.component';

describe( 'TbApplicationComponent', () =>
{
  let component: TbApplicationComponent;
  let fixture: ComponentFixture<TbApplicationComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [TbApplicationComponent]
    } ).compileComponents();
    
    fixture = TestBed.createComponent( TbApplicationComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () =>
  {
    expect( component ).toBeTruthy();
  } );
} );