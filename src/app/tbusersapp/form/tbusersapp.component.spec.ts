import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbUsersAppComponent } from './tbusersapp.component';

describe('TbuserappComponent', () =>
{
  let component: TbUsersAppComponent;
  let fixture: ComponentFixture<TbUsersAppComponent>;

  beforeEach(async () =>
    {
      await TestBed.configureTestingModule(
        {
          declarations: [TbUsersAppComponent]
        }
      ).compileComponents();
    
      fixture = TestBed.createComponent(TbUsersAppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});