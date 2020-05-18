import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../api/api.service';
import { state } from '@angular/animations';
import { PageAuthService } from '../page-auth/page-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any> {
  
  constructor(private api: ApiService, private pageAuth: PageAuthService) { }
  
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    console.log(route.url[0].path);
    
  }

  async checkPermission(url){
    await this.pageAuth.checkPermission(url);
  }
}
