import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {

  private jobs: [];

  constructor(private api: ApiService) { }

  async getAppliedJobs() {
    const endPoint = 'applied-jobs';
    const token = localStorage.getItem('token');
    await this.api.get(endPoint, { Authorization: token }).then(
      (res: any) => {
        this.jobs = res.applied_jobs;
      }
    );
    return this.jobs;
  }

  async cancelApply(jobIdentificator: number) {
    await this.api.postTokenHeader('delete-applied-job/' + jobIdentificator, {});
  }
}
