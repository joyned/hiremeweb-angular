import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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

  constructor(private dialogConf: DynamicDialogConfig, private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.jobId = this.dialogConf.data.id;
    this.getCandidatesByJobId();
  }

  private getCandidatesByJobId() {
    this.http.get<any>(ApiUtil.getPath() + 'job/candidates/' + this.jobId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.candidates = data.payload;
          this.candidates.forEach(candidate => {
            candidate.applicationDate = this.datePipe.transform(candidate.applicationDate, 'dd/MM/yyyy');
          });
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }


}
