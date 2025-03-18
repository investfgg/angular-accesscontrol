import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbObjectComponent } from './tbobject.component';

describe('TbobjectComponent', () => {
  let component: TbObjectComponent;
  let fixture: ComponentFixture<TbObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
