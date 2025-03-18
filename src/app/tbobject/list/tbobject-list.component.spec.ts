import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbobjectListComponent } from './tbobject-list.component';

describe('TbobjectListComponent', () => {
  let component: TbobjectListComponent;
  let fixture: ComponentFixture<TbobjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbobjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbobjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
