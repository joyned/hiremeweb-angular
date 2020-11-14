import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCandidateProfileComponent } from './job-candidate-profile.component';

describe('JobCandidateProfileComponent', () => {
  let component: JobCandidateProfileComponent;
  let fixture: ComponentFixture<JobCandidateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCandidateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
