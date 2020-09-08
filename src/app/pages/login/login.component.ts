import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { LoginService } from 'src/app/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private alertMessage: AlertMessageService, private http: HttpClient) { }

  public user = new User();

  public isLoading = false;
  private userAuth = false;

  public errorMessage = '';
  public errorMessageVisible = false;

  private redirectUrl: string;

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.paramMap.get('redirect');
  }

  async doLogin() {
    try {
      this.isLoading = true;
      await this.loginService.login(this.user);

      if (!this.redirectUrl) {
        this.router.navigateByUrl('/')
        window.location.reload();
      }

    } catch (error) {
      this.alertMessage.errorMessage("Erro", "O usuário/senha estão incorretos. Tente novamente.")
    } finally {
      this.isLoading = false;
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

}
