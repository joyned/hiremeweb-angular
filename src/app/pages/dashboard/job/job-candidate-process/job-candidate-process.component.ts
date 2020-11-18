import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JobSelectiveProcess } from 'src/app/classes/selective-process/job-selective-process';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-job-candidate-process',
  templateUrl: './job-candidate-process.component.html',
  styleUrls: ['./job-candidate-process.component.scss']
})
export class JobCandidateProcessComponent implements OnInit {

  public candidate: any;
  public jobSelectiveProcess: JobSelectiveProcess[];
  public loading = false;
  public lastApproval = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private confirmationService: ConfirmationService, private router: Router,
    private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.candidate = JSON.parse(this.activatedRoute.snapshot.paramMap.get('candidate'));
    this.getSelectiveProcess();
  }

  private getSelectiveProcess() {
    this.loading = true;
    this.http.post<any>(ApiUtil.getPath() + 'selective/process/job/candidate', this.candidate, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobSelectiveProcess = data.payload.selectiveProcess;
          this.loading = false;
        }),
        catchError((httpResponse) => {
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public confirmApprove(processId: number) {
    this.confirmationService.confirm({
      header: 'Aprovação',
      message: 'Tem certeza que deseja aprovar o candidato nessa etapa?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.approve(processId)
    });
  }

  private approve(processId: number) {
    this.loading = true;
    this.http.post<any>(ApiUtil.getPath() + 'approval/selective/process/approve/' + processId, {}, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Aprovado com suceso!');
          this.getSelectiveProcess();
          this.loading = false;
          this.lastApproval = Boolean(data.payload);
          console.log(this.lastApproval);
        }),
        catchError((httpResponse) => {
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao aprovar. Tente novamente.');
          this.getSelectiveProcess();
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public confirmReject(processId: number) {
    this.confirmationService.confirm({
      header: 'Aprovação',
      message: 'Tem certeza que deseja reprovar o candidato nessa etapa? Caso sim, o proceso irá parar.',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.reject(processId)
    });
  }


  private reject(processId: number) {
    this.loading = true;
    this.http.post<any>(ApiUtil.getPath() + 'approval/selective/process/reject/' + processId, {}, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.getSelectiveProcess();
          this.loading = false;
        }),
        catchError((httpResponse) => {
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public viewAnswers(jobSelectiveProcess: JobSelectiveProcess) {
    this.router.navigate(['dashboard/job/candidates/questionnaire/answer', {
      personId: this.candidate.personId,
      jobId: this.candidate.jobId,
      questionnaireId: jobSelectiveProcess.questionnaireId
    }]);
  }

}
