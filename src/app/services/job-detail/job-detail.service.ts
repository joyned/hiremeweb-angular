import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class JobDetailService {

  private data: any;

  constructor(private api: ApiService) { }

  async getJobDetailById(id: any) {
    const endPoint = 'job/detail/' + id;
    await this.api.post(endPoint, {}, {})
      .then(
        (res: any) => {
          this.data = res;
        });
    return this.data;
  }

  async applyToJob(jobIdentificator: any) {
    const endPoint = 'job-apply';
    let userId: any;
    if (localStorage.getItem('candidate_id')) {
      userId = localStorage.getItem('candidate_id');
    }
    await this.api.postTokenHeader(endPoint, {
      jobId: jobIdentificator,
      userId: userId == null ? 0 : userId
    });
  }
}
