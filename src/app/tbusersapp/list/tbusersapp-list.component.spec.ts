import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbusersappListComponent } from './tbusersapp-list.component';

describe('TbusersappListComponent', () => {
  let component: TbusersappListComponent;
  let fixture: ComponentFixture<TbusersappListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbusersappListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbusersappListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
