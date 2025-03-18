import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbusraccessListComponent } from './tbusraccess-list.component';

describe('TbusraccessListComponent', () => {
  let component: TbusraccessListComponent;
  let fixture: ComponentFixture<TbusraccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbusraccessListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbusraccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
