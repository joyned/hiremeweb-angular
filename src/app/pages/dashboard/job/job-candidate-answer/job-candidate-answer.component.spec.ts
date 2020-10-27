import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCandidateAnswerComponent } from './job-candidate-answer.component';

describe('JobCandidateAnswerComponent', () => {
  let component: JobCandidateAnswerComponent;
  let fixture: ComponentFixture<JobCandidateAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCandidateAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCandidateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
