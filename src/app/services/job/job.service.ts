import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Job } from 'src/app/classes/job/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: Job[];

  constructor(private api: ApiService) { }

  async getJobs() {
    await this.api.getResult('job/all', {})
      .then(
        (res: any) => {
          this.jobs = res.job_list;
          for (var index in this.jobs) {
            let trimDescription = this.jobs[index].description.substring(0, 200);
            this.jobs[index].shortDescription = trimDescription + '...';
          }
        }
      );
    return this.jobs;
  }
}
