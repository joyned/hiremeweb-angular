import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JobSelectiveProcess } from 'src/app/classes/selective-process/job-selective-process';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-job-candidate-process',
  templateUrl: './job-candidate-process.component.html',
  styleUrls: ['./job-candidate-process.component.scss']
})
export class JobCandidateProcessComponent implements OnInit {

  private candidate: any;
  public jobSelectiveProcess: JobSelectiveProcess[];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.candidate = JSON.parse(this.activatedRoute.snapshot.paramMap.get('candidate'));
    this.getSelectiveProcess();
  }

  public getSelectiveProcess() {
    this.http.post<any>(ApiUtil.getPath() + 'selective/process/job/candidate', this.candidate, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobSelectiveProcess = data.payload.selectiveProcess;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  public approve(processId: number) {
    this.http.post<any>(ApiUtil.getPath() + 'approval/selective/process/approve/' + processId, {}, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

}
