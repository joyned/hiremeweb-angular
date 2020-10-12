import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveProcessRegisterComponent } from './selective-process-register.component';

describe('SelectiveProcessRegisterComponent', () => {
  let component: SelectiveProcessRegisterComponent;
  let fixture: ComponentFixture<SelectiveProcessRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveProcessRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveProcessRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
