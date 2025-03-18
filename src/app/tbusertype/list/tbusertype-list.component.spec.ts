import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbusertypeListComponent } from './tbusertype-list.component';

describe('TbusertypeListComponent', () => {
  let component: TbusertypeListComponent;
  let fixture: ComponentFixture<TbusertypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbusertypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbusertypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
