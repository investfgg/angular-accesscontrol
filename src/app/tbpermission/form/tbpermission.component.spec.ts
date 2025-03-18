import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbPermissionComponent } from './tbpermission.component';

describe('TbobjectComponent', () => {
  let component: TbPermissionComponent;
  let fixture: ComponentFixture<TbPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});