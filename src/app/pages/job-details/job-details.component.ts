import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobDetailService } from 'src/app/services/job-detail/job-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  providers: [ConfirmationService]
})
export class JobDetailsComponent implements OnInit {

  constructor(private jobService: JobDetailService, private activatedRoute: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) { }

  private currentDialog: any;

  public job: any;
  public isLoading = false;
  public showButton = true;
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
    console.log(this.job)
    this.confirmationService.confirm({
      message: 'Tem certeza de deseja candidatar a vaga ' + this.job.title,
      header: 'Confirmação',
      accept: () => {
        console.log(this.job);
      }
    });
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
