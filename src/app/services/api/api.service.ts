import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly url = 'https://python-hire-me-api.herokuapp.com/api/';
  // private readonly url = 'http://localhost:4200/api/';

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

  getResult(endPoint: string, header: any) {
    return this.http.get(this.url + endPoint, { headers: header }).toPromise();
  }
}
