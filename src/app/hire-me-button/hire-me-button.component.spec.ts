import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireMeButtonComponent } from './hire-me-button.component';

describe('HireMeButtonComponent', () => {
  let component: HireMeButtonComponent;
  let fixture: ComponentFixture<HireMeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireMeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireMeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
