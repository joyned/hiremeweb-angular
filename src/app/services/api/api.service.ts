import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly url = "https://python-api-test-ionic.herokuapp.com/api/";

  private response: any;

  post(endPoint: string, headers: any, body: any){

  }

  async get(endPoint: string, headers: any): Promise<any>{
    const promise = new Promise(async (resolve, rejects) => {
      await this.http.get<any>(this.url + endPoint, headers)
      .toPromise()
      .then((res: any) => {
          this.response = res;
          resolve();
        },
          err => {
            console.log(err);
          }
        );
    });
    return promise;
  }

  getResult(endPoint: string, headers: any){
    return this.http.get(this.url + endPoint, {}).toPromise();
  }
}
