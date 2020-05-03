import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireMeTitleComponent } from './hire-me-title.component';

describe('HireMeTitleComponent', () => {
  let component: HireMeTitleComponent;
  let fixture: ComponentFixture<HireMeTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireMeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireMeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
