import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private api: ApiService) { }

  async getPagesByUserId() {
    const endPoint = 'pages/';
    const data: any = await this.api.get(endPoint, {
      Authorization: localStorage.getItem('token')
    });
    return data.payload;
  }
}
