import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordEmail: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public send() {
    const body = { email: this.forgotPasswordEmail };
    this.http.post<any>(ApiUtil.getPath() + 'reset-password', body, {})
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

}
