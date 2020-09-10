import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/classes/job/job';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { JobService } from 'src/app/services/job/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService, private alertMessageService: AlertMessageService, private router: Router) { }

  public isEditing: boolean;
  public job: Job;
  public jobs: Job[] = [];
  public isLoading = false;
  public jobName: string;

  ngOnInit() {
    this.isEditing = false;
    this.listJobs();
  }
  
  async listJobs() {
    this.isLoading = true;
    this.jobs = await this.jobService.getJobs();
    this.isLoading = false;
  }

  filter() {
    this.alertMessageService.infoMessage('Indisponível.', 'Temporariamente o serviço de filtrar está indisponível.')
  }

  jobDetails(id: number) {
    this.router.navigate(['/jobs-detail', id, true]);
  }

}
