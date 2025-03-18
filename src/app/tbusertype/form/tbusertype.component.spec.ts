import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbusertypeComponent } from './tbusertype.component';

describe('TbusertypeComponent', () => {
  let component: TbusertypeComponent;
  let fixture: ComponentFixture<TbusertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbusertypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbusertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
