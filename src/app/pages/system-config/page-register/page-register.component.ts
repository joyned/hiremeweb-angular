import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss'],
})
export class PageRegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public isLoading = true;
  public profiles = [];

  public pageRegister = {
    pageName: '',
    pageURL: '',
    pagePermission: []
  };

  ngOnInit(): void {
    this.getProfiles();
  }

  public getProfiles() {
    this.http.get<any>(ApiUtil.getPath() + 'users-profiles', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.profiles = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
    this.isLoading = false;
  }

  public save() {
    this.http.post<any>(ApiUtil.getPath() + 'page-register', this.pageRegister, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public checkEvent(event, value) {
    if (event.checked) {
      this.pageRegister.pagePermission.push(value);
    } else {
      const index = this.pageRegister.pagePermission.indexOf(value);
      this.pageRegister.pagePermission.splice(index, 1);
    }
  }
}
