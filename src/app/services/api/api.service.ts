import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly url = "https://python-hire-me-api.herokuapp.com/api/";
  //private readonly url = "http://localhost:4200/api/";

  getFromExternal(url: any){
    return this.http.get(url, {}).toPromise();
  }

  delete(endPoint: string, options: any){
    return this.http.delete(this.url + endPoint, options).toPromise();
  }

  post(endPoint: string, body: any, options: any){
    return this.http.post(this.url + endPoint, body, options).toPromise();
  }

  postTokenHeader(endPoint: string, body: any){
    let token;
    if(localStorage.getItem('token') != null){
      token = localStorage.getItem('token');
    }
    
    let data = this.http.post(this.url + endPoint, body, {headers: {'Authorization': token}}).toPromise();
    console.log(data);
    return data;
  }

  getResult(endPoint: string, headers: any){
    return this.http.get(this.url + endPoint, {headers: headers}).toPromise();
  }
}
