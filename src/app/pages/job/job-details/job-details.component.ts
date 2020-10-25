import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { UserUtil } from 'src/app/classes/utils/UserUtils/user-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router,
              private confirmationService: ConfirmationService, private alertMessage: AlertMessageService) { }

  public job: Job;
  public logged: boolean;
  public loading: boolean;
  public canApply: boolean;
  public companyUser: boolean;

  private jobId: number;

  ngOnInit(): void {
    this.showApplyButton();
    this.job = new Job();
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.checkIfCompanyPerson();
    this.checkIfAlreadyApplied();
    this.getDetails();
  }

  private showApplyButton() {
    this.logged = UserUtil.isLogged();
  }

  private checkIfAlreadyApplied() {
    this.http.get<any>(ApiUtil.getPath() + 'job/personCanApply/' + this.jobId, ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.canApply = Boolean(data.payload);
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  private checkIfCompanyPerson() {
    this.http.get<any>(ApiUtil.getPath() + 'user/companyPerson', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.companyUser = Boolean(data.payload);
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  private getDetails() {
    this.loading = true;

    this.http.post<any>(ApiUtil.getPath() + 'job/detail/' + this.jobId, {})
      .pipe(
        tap((data) => {
          this.job = data.payload;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();

    this.loading = false;
  }

  public doLogin() {
    const routeToRedirect = this.router.url;
    this.router.navigate(['/login', { redirect: routeToRedirect }]);
  }

  public confirmJobApplication() {
    this.confirmationService.confirm({
      header: this.job.title,
      message: 'Deseja candidatar-se para <b>' + this.job.title + '</b>?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.applyToJob()
    });
  }

  private applyToJob() {
    const body = {
      jobId: this.job.id
    };

    this.http.post<any>(ApiUtil.getPath() + 'job/apply', body, ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.alertMessage.successMessage('Sucesso', 'Sua aplicação para a vaga ' + this.job.title + ' foi um sucesso!');
        }),
        catchError((httpResponse) => {
          this.alertMessage.errorMessage('Erro', 'Sua aplicação para a vaga '
            + this.job.title + ' não foi efetuda com sucesso. Por favor, tente novamente.');
          return of();
        })
      ).subscribe();

  }

}
