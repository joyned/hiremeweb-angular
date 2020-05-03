import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class JobDetailService {

  constructor(private api: ApiService) { }

  private data: any;

  async getJobDetailById(id: any){
    let endPoint = 'job/detail/' + id;
    await this.api.post(endPoint, {}, {})
      .then(
        (res: any) => {
          this.data = res;
      });
    return this.data;
  }

  async applyToJob(jobId: any){
    let endPoint = 'job-apply';
    let userId: any;
    if(localStorage.getItem('candidate_id')){
      userId = localStorage.getItem('candidate_id')
    }
    await this.api.postTokenHeader(endPoint, {
      jobId: jobId,
      userId: userId == null ? 0 : userId
    });
  }
}
