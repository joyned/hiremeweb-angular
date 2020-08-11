import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Job } from 'src/app/classes/job/job';
import { AppliedJobsService } from '../../services/applied-jobs/applied-jobs.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
  providers: [ConfirmationService]
})
export class AppliedJobsComponent implements OnInit {

  constructor(private service: AppliedJobsService, private confirmationService: ConfirmationService) { }

  public jobs: Job[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.getAppliedJobs();
  }

  async getAppliedJobs() {
    this.isLoading = true;
    this.jobs = await this.service.getAppliedJobs();
    this.isLoading = false;
  }

  showCancelConfirmDialog(job: Job) {
    this.confirmationService.confirm({
      message: 'Tem certeza de deseja <b>cancelar</b> a aplicação para <b>' + job.title + '</b>',
      header: 'Confirmação',
      accept: () => {
        this.cancel(job.id);
      }
    });
  }

  jobDetails(id: number) {
  }

  async cancel(jobId: number) {
    try {
      await this.service.cancelApply(jobId);
    } catch (error) {
      console.error(error);
    } finally {
      this.getAppliedJobs();
    }
  }
}
