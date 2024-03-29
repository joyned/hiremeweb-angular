import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageAuthService {

  constructor(private api: ApiService) { }

  async checkPermission(pageAccessed: any) {
    const endPoint = 'permision-on-page';
    await this.api.postTokenHeader(endPoint, {
      userId: localStorage.getItem('user_id'),
      page: pageAccessed
    });
  }
}
