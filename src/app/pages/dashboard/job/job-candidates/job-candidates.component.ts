import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.scss']
})
export class JobCandidatesComponent implements OnInit {

  private jobId: number;
  public candidates: any[];
  public jobTitle: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit(): void {
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCandidatesByJobId();
  }

  private getCandidatesByJobId() {
    this.http.get<any>(ApiUtil.getPath() + 'selective/process/candidates/' + this.jobId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobTitle = data.payload.jobTitle;
          this.candidates = data.payload.candidates;
          this.candidates.forEach(candidate => {
            candidate.applicationDate = this.datePipe.transform(candidate.applicationDate, 'dd/MM/yyyy');
          });
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  public openProcess(candidate: any) {
    const data = {
      personId: candidate.candidateId,
      jobId: this.jobId,
      candidateName: candidate.candidateName,
      jobTitle: this.jobTitle
    };

    this.router.navigate(['dashboard/job/candidate/process', { candidate: JSON.stringify(data) }]);
  }

}
