import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private api: ApiService) { }

  async getPagesByUserId(userId: any){
    let endPoint = 'pages/' + userId;
    let data = await this.api.getResult(endPoint, {
      "Authorization": localStorage.getItem('token')
    });
    return data['pages'];
  }
}
