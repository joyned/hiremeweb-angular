import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/classes/user/user';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private loginService: LoginService, private activatedRoute: ActivatedRoute, private alertMessage: AlertMessageService) { }

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
      window.location.reload();
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

}
