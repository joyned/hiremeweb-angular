import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { JobCandidatesComponent } from '../job-candidates/job-candidates.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public jobs: Job[] = [];

  constructor(private http: HttpClient, private router: Router, private dialogService: DialogService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getJobsByUserId();
  }

  public getJobsByUserId() {
    this.http.get<any>(ApiUtil.getPath() + 'job/jobs-by-user', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobs = data.payload;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }
  public registerNewJob() {
    this.router.navigateByUrl('/dashboard/job');
  }

  public editJob(job: Job) {
    this.router.navigate(['/dashboard/job', { id: job.id }]);
  }

  public openCandidates(jobId: number) {
    this.dialogService.open(JobCandidatesComponent, {
      header: 'Candidatos',
      styleClass: 'hire-me-dialog',
      width: '50%',
      data: {
        id: jobId
      }
    });
  }

  public openDetails(jobId: number) {
    this.router.navigate(['/jobs-detail', jobId]);
  }

  public confirmChangeStatus(job: Job) {
    let messageText: string;
    if (job.status) {
      messageText = 'Deseja realmente alterar o status da vaga para inativa? Ela não aparecerá mais nas listagens das vagas.';
    } else {
      messageText = 'Deseja realmente alterar o status da vga para ativa? Ela irá aparecer novamente nas listagens das vagas.';
    }
    this.confirmationService.confirm({
      message: messageText,
      header: 'Alterar status da vaga',
      accept: () => {
        this.changeJobStatus(job);
      }
    });
  }

  public changeJobStatus(job: Job) {
    const body = {
      status: !job.status,
      jobId: job.id
    };
    this.http.post<any>(ApiUtil.getPath() + 'job/status', body, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }
}
