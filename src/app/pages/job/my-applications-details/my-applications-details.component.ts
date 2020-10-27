import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JobSelectiveProcess } from 'src/app/classes/selective-process/job-selective-process';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-my-applications-details',
  templateUrl: './my-applications-details.component.html',
  styleUrls: ['./my-applications-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyApplicationsDetailsComponent implements OnInit {

  private jobId: number;
  
  public jobSelectiveProcess: JobSelectiveProcess[];
  public jobTitle: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.jobSelectiveProcess = [];
    this.getJobSelectiveProcess();
  }

  private getJobSelectiveProcess() {
    this.http.get<any>(ApiUtil.getPath() + 'selective/process/job/' + this.jobId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobTitle = data.payload.jobTitle;
          this.jobSelectiveProcess = data.payload.selectiveProcess;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public goToAwnserQuestionnaire(jobSelectiveProcess: JobSelectiveProcess){
    this.router.navigate(['questionnaire/answer', {
      questionnaireId: jobSelectiveProcess.questionnaireId,
      approvalId: jobSelectiveProcess.id
    }]);
  }

  public goToViewQuestionnaire(jobSelectiveProcess: JobSelectiveProcess){
    this.router.navigate(['questionnaire/answer', {
      questionnaireId: jobSelectiveProcess.questionnaireId,
      approvalId: jobSelectiveProcess.id,
      view: true
    }]);
  }


}
