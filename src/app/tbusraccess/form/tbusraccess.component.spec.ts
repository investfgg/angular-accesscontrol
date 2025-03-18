import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbUsrAccessFormComponent } from './tbusraccess.component';

describe('TbusraccessFormComponent', () => {
  let component: TbUsrAccessFormComponent;
  let fixture: ComponentFixture<TbUsrAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbUsrAccessFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbUsrAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
