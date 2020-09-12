import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = ApiUtil.getPath();

  constructor(private http: HttpClient) {
  }

  getFromExternal(url: any) {
    return this.http.get(url, {}).toPromise();
  }

  delete(endPoint: string, options: any) {
    return this.http.delete(this.url + endPoint, options).toPromise();
  }

  post(endPoint: string, body: any, options: any) {
    return this.http.post(this.url + endPoint, body, options).toPromise();
  }

  postTokenHeader(endPoint: string, body: any) {
    let token: string;
    if (localStorage.getItem('token') != null) {
      token = localStorage.getItem('token');
    }

    return this.http.post(this.url + endPoint, body, { headers: { Authorization: token } }).toPromise();
  }

  get(endPoint: string, header: any) {
    return this.http.get(this.url + endPoint, { headers: header }).toPromise();
  }
}
