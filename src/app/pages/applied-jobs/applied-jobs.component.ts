import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class AppliedJobsComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private http: HttpClient, private router: Router,
    private alertMessageService: AlertMessageService) { }

  public jobs: Job[];
  public isLoading = true;

  public cols = [];

  ngOnInit(): void {
    this.jobs = [];
    this.getAppliedJobs();

    this.cols = [
      { field: 'title' },
      { field: 'info' },
      { field: 'cancel' }
    ];
  }

  test(data: any) {
    console.log(data)
  }

  private getAppliedJobs() {
    this.isLoading = true;
    this.http.get<any>(ApiUtil.getPath() + 'job/applied-jobs', ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.jobs = data.payload;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
    this.isLoading = false;
  }

  public showCancelConfirmDialog(job: Job) {
    this.confirmationService.confirm({
      message: 'Tem certeza de deseja <b>cancelar</b> a aplicação para <b>' + job.title + '</b>',
      header: 'Confirmação',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.cancelApplication(job.id);
      }
    });
  }

  private cancelApplication(jobId: number) {
    this.http.post<any>(ApiUtil.getPath() + 'job/delete/' + jobId, {}, ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.alertMessageService.successMessage('Sucesso!', 'O cancelamento da aplicação foi feita com sucesso.')
        }),
        catchError((httpResponse) => {
          this.alertMessageService.errorMessage('Erro!', 'Não foi possivel realizar o cancelamento da aplicação. Tente novamente.')
          return of();
        })
      ).subscribe();

    this.removeDeletedJobFromList(jobId);
  }

  private removeDeletedJobFromList(jobId) {
    this.jobs = this.jobs.filter(({ id }) => id !== jobId);
  }

  public openJobsList() {
    this.router.navigateByUrl('/jobs')
  }
}
