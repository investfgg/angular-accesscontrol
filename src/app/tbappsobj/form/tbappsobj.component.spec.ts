import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbAppsObjComponent } from './tbappsobj.component';

describe( 'TbAppsObjComponent', () =>
{
  let component: TbAppsObjComponent;
  let fixture: ComponentFixture<TbAppsObjComponent>;

  beforeEach( async () =>
  {
    await TestBed.configureTestingModule(
    {
      declarations: [TbAppsObjComponent]
    } ).compileComponents();

    fixture = TestBed.createComponent(TbAppsObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () =>
  {
    expect(component).toBeTruthy();
  } );
} );