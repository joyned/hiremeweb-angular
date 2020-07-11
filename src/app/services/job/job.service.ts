import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: [];

  constructor(private api: ApiService) { }

  async getJobs() {
    await this.api.getResult('job/all', {})
      .then(
        (res: any) => {
          this.jobs = res.job_list;
        }
      );
    return this.jobs;
  }
}
