import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbuserComponent } from './tbuser.component';

describe('TbuserComponent', () => {
  let component: TbuserComponent;
  let fixture: ComponentFixture<TbuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
