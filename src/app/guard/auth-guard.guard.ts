import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageAuthService } from '../services/page-auth/page-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private pageAuth: PageAuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return this.checkPermission(state);
    }

    this.router.navigateByUrl('/');
    return false;
  }

  async checkPermission(state) {
    // try {
    //   await this.pageAuth.checkPermission(state.url);
    //   return true;
    // } catch (error) {
    //   this.router.navigateByUrl('/');
    //   return false;
    // }
    return true;
  }
}
