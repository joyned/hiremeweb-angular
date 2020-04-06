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
    await this.api.post(endPoint, {})
      .then(
        (res: any) => {
          this.data = res;
      });
    return this.data;
  }
}
