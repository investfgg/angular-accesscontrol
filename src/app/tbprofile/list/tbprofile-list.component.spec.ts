import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbprofileListComponent } from './tbprofile-list.component';

describe('TbprofileListComponent', () => {
  let component: TbprofileListComponent;
  let fixture: ComponentFixture<TbprofileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbprofileListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbprofileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
