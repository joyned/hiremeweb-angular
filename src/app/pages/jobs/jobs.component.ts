import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job/job.service';
import { Job } from 'src/app/classes/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService, private router: Router) { }

  public isEditing: boolean;
  public job: Job;
  public jobs: Array<any> = [];
  public isLoading = false;

  ngOnInit() {
    this.isEditing = false;
    this.listJobs();
  }

  async listJobs(){
    this.isLoading = true;
    this.jobs = await this.jobService.getJobs();
    this.isLoading = false;
  }

  jobDetails(id: number){
    this.router.navigate(['/job-details', id])
  }

}
