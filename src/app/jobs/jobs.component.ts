import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Job } from '../classes/job/job';
import { JobService } from '../services/job/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private rootComponent: AppComponent, private jobService: JobService, private router: Router) { }

  public isEditing: boolean;
  public job: Job;
  public jobs: Array<any> = [];
  public isLoading = false;

  ngOnInit() {
    this.isEditing = false;
    this.listJobs()
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
