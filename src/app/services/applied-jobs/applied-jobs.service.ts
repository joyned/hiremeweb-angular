import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {

  private jobs: [];

  constructor(private api: ApiService) { }

  async getAppliedJobs() {
    const endPoint = 'job/applied';
    const token = localStorage.getItem('token');
    await this.api.get(endPoint, { Authorization: token }).then(
      (res: any) => {
        this.jobs = res.payload;
      }
    );
    return this.jobs;
  }

  async cancelApply(jobIdentificator: number) {
    await this.api.postTokenHeader('job/delete/' + jobIdentificator, {});
  }
}
