import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job/job.service';
import { Job } from 'src/app/classes/job/job';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService, private dialog: MatDialog) { }

  public isEditing: boolean;
  public job: Job;
  public jobs: Array<any> = [];
  public isLoading = false;
  public jobName: string;

  ngOnInit() {
    this.isEditing = false;
    this.listJobs();
  }

  async listJobs(){
    this.isLoading = true;
    this.jobs = await this.jobService.getJobs();
    this.isLoading = false;
  }

  filter(){
    console.log(this.jobName);
  }

  jobDetails(id: number){
    this.dialog.open(JobDetailsComponent, {
      data: {
        job_id: id
      }
    });
  }

}
