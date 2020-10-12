import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveProcessListComponent } from './selective-process-list.component';

describe('SelectiveProcessListComponent', () => {
  let component: SelectiveProcessListComponent;
  let fixture: ComponentFixture<SelectiveProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
