import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Job } from 'src/app/classes/job/job';
import { JobService } from 'src/app/services/job/job.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService, private dialog: MatDialog, private router: Router) { }

  public isEditing: boolean;
  public job: Job;
  public jobs: Array<Job> = [];
  public isLoading = false;
  public jobName: string;

  ngOnInit() {
    console.log(this.jobs.length)
    this.isEditing = false;
    this.listJobs();
  }

  async listJobs() {
    this.isLoading = true;
    this.jobs = await this.jobService.getJobs();
    this.isLoading = false;

  }

  filter() {
    console.log(this.jobName);
  }

  jobDetails(id: number) {
    this.router.navigate(['/jobs-detail', id, true]);
  }

}
