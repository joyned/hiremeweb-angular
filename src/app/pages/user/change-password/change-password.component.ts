import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ChangePassword } from 'src/app/classes/user/ChangePassword';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePassword: ChangePassword;
  public showErrorMessage = false;
  public errorMessage: string;

  constructor(private dialogRef: DynamicDialogRef, private http: HttpClient,
              private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.changePassword = new ChangePassword();
  }

  public send() {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    if (this.checkNewPassword()) {
      this.http.post<any>(ApiUtil.getPath() + '/change-password', this.changePassword, ApiUtil.buildOptions())
        .pipe(
          tap((data: any) => {
            this.dialogRef.close();
            this.alertMessageService.successMessage('Sucesso', 'Sua senha foi alterada com sucesso.');
          }),
          catchError((httpErrorResponse) => {
            if(httpErrorResponse.error.payload === 'wrong.password'){
              this.errorMessage = 'A senha atual está incorreta';
              this.showErrorMessage = true;
            }
            return of();
          })
        ).subscribe();
    } else {
      this.errorMessage = 'As senhas novas não estão iguais ou estão em branco';
      this.showErrorMessage = true;
    }
  }

  public checkNewPassword() {
    return (this.changePassword.newPassword === this.changePassword.confirmationNewPassword)
      && (this.changePassword.newPassword || this.changePassword.confirmationNewPassword)
  }

}
