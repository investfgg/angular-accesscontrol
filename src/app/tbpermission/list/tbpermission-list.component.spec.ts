import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbPermissionListComponent } from './tbpermission-list.component';

describe('TbobjectListComponent', () => {
  let component: TbPermissionListComponent;
  let fixture: ComponentFixture<TbPermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbPermissionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});