import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbApplicationListComponent } from './tbapplication-list.component';

describe( 'TbApplicationListComponent', () =>
{
  let component: TbApplicationListComponent;
  let fixture: ComponentFixture<TbApplicationListComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [TbApplicationListComponent]
    } ).compileComponents();
    
    fixture = TestBed.createComponent( TbApplicationListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it('should create', () =>
  {
    expect( component ).toBeTruthy();
  } );
} );