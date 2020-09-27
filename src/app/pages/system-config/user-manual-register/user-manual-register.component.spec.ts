import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManualRegisterComponent } from './user-manual-register.component';

describe('UserManualRegisterComponent', () => {
  let component: UserManualRegisterComponent;
  let fixture: ComponentFixture<UserManualRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManualRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManualRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
