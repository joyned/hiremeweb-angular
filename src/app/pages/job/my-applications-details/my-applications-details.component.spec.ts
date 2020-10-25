import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationsDetailsComponent } from './my-applications-details.component';

describe('MyApplicationsDetailsComponent', () => {
  let component: MyApplicationsDetailsComponent;
  let fixture: ComponentFixture<MyApplicationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApplicationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
