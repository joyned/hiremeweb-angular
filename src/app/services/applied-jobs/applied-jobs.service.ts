import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {

  private jobs: [];
  
  constructor(private api: ApiService) { }

  async getAppliedJobs(){
    let endPoint = 'applied-jobs';
    let candidateId = localStorage.getItem("candidate_id");
    let token = localStorage.getItem("token");
    endPoint = endPoint + '/' + candidateId;
    await this.api.getResult(endPoint, {'Authorization': token}).then(
      (res: any) => {
        this.jobs = res['applied_jobs'];
      }
    );
    return this.jobs;
  }

  async cancelApply(jobId: number){
    let endPoint = 'delete-applied-job';
    let candidateId = localStorage.getItem("candidate_id");
    let token = localStorage.getItem("token");

    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      body: {
        candidateId: candidateId,
        jobId: jobId
      }
    }
    await this.api.delete(endPoint, options);
  }
}
