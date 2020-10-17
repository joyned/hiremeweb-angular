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
    await this.api.get('job/all', {})
      .then(
        (res: any) => {
          this.jobs = res.payload;
          this.jobs.forEach(job => {
            const trimDescription = job.description.substring(0, 200);
            job.shortDescription = trimDescription + '...';
          });
        }
      );
    return this.jobs;
  }
}
