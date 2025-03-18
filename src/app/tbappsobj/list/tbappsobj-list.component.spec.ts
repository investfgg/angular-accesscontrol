import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbAppsObjListComponent } from './tbappsobj-list.component';

describe( 'TbAppsObjListComponent', () =>
{
  let component: TbAppsObjListComponent;
  let fixture: ComponentFixture<TbAppsObjListComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [TbAppsObjListComponent]
    } ).compileComponents();
    
    fixture = TestBed.createComponent( TbAppsObjListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () =>
  {
    expect(component).toBeTruthy();
  } );
} );