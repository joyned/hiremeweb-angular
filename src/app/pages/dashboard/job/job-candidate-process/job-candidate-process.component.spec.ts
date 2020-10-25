import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCandidateProcessComponent } from './job-candidate-process.component';

describe('JobCandidateProcessComponent', () => {
  let component: JobCandidateProcessComponent;
  let fixture: ComponentFixture<JobCandidateProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCandidateProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCandidateProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
