import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobDetailService } from 'src/app/services/job-detail/job-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  constructor(private jobService: JobDetailService, private activatedRoute: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService,
    private alertMessage: AlertMessageService) { }

  private currentDialog: any;

  public job: any;
  public isLoading = false;
  public showButton = true;
  public mobileBottomBar = false;
  private jobId: number;

  ngOnInit(): void {
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('job_id'));
    this.showButton = Boolean(this.activatedRoute.snapshot.paramMap.get('show_button'))
    this.getJobDetail();
  }

  closeDialog() {
    this.currentDialog.close();
  }

  showConfirmDialog() {
    if (window.innerWidth >= 960) {
      this.confirmationService.confirm({
        message: 'Tem certeza de deseja candidatar a vaga ' + this.job.title,
        header: 'Confirmação',
        accept: () => {
          this.applyToJob();
        }
      });
    } else {
      this.mobileBottomBar = true;
    }
  }

  async applyToJob() {
    try {
      await this.jobService.applyToJob(this.jobId);
      this.mobileBottomBar = false;
      this.alertMessage.successMessage("Sucesso", "Sua aplicação para a vaga " + this.job.title + " foi um sucesso!");
    } catch (error) {
      this.mobileBottomBar = false;
      this.alertMessage.errorMessage("Erro", "Sua aplicação para a vaga " + this.job.title + " não foi efetuda com sucesso. Por favor, tente novamente.")
    }
  }

  userLogged() {
    return localStorage.getItem('token') != null;
  }

  async getJobDetail() {
    this.isLoading = true;
    this.job = await this.jobService.getJobDetailById(this.jobId);
    this.isLoading = false;
  }

  backButton() {
    this.router.navigateByUrl('/jobs');
  }

}
