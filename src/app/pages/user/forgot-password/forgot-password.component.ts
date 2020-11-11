import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordEmail: string;

  constructor(private http: HttpClient, private alertMessage: AlertMessageService) { }

  ngOnInit(): void {
  }

  public send() {
    const body = { email: this.forgotPasswordEmail };
    this.http.post<any>(ApiUtil.getPath() + 'reset-password', body, {})
      .pipe(
        tap((data: any) => {
          if (data.payload === 'email.not.found') {
            this.alertMessage.errorMessage('Email não encontrado', 'O email informado não foi encontrado em nosso sistema.');
          } else {
            this.alertMessage.successMessage('Email enviado', 'Um email com uma nova senha foi enviado para você. Verifique na sua caixa de entrada ou spam.');
          }
        }),
        catchError((httpErrorResponse) => {
          console.log(httpErrorResponse)
          return of();
        })
      ).subscribe();
  }

}
