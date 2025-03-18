import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbUserListComponent } from './tbuser-list.component';

describe('TbUserListComponent', () => {
  let component: TbUserListComponent;
  let fixture: ComponentFixture<TbUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
