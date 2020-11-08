import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { LoginService } from 'src/app/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuBarComponent } from 'src/app/components/menu-bar/menu-bar.component';
import { DatasharingService } from 'src/app/services/data-sharing/datasharing.service';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private loginService: LoginService, private activatedRoute: ActivatedRoute,
              private alertMessage: AlertMessageService, private dataSharingService: DatasharingService) { }

  public user = new User();
  public loading = false;
  public errorMessage = '';
  public errorMessageVisible = false;

  private redirectUrl: string;
  private userAuth = false;
  private response: any;

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.paramMap.get('redirect');
  }

  async doLogin() {
    console.log(this.loading)
    this.loading = true;
    try {
      this.response = await this.loginService.login(this.user);

      this.dataSharingService.userName.next(localStorage.getItem('user'));
      this.dataSharingService.pages.next(this.response.payload.pages);

      if (!this.redirectUrl) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl(this.redirectUrl);
      }

    } catch (error) {
      this.alertMessage.errorMessage('Erro', 'O usuário/senha estão incorretos. Tente novamente.');
    } finally {
      this.loading = false;
      console.log(this.loading)
    }
  }

  getUserAuth() {
    return this.userAuth;
  }

  showErrorMessage() {
    if (this.errorMessageVisible) {
      return;
    }
    this.errorMessageVisible = this.errorMessage.length !== 0;
    setTimeout(() => this.errorMessageVisible = false, 4000);
  }


  goRegister() {
    this.router.navigateByUrl('/register');
  }

  public forgotPassword(){
    this.router.navigateByUrl('/forgot-password');
  }

}
