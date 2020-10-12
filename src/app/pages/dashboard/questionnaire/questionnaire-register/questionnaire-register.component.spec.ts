import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireRegisterComponent } from './questionnaire-register.component';

describe('QuestionnaireRegisterComponent', () => {
  let component: QuestionnaireRegisterComponent;
  let fixture: ComponentFixture<QuestionnaireRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
