import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user/user';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private loginService: LoginService) { }

  public user = new User();

  public isLoading = false;
  private userAuth = false;

  public errorMessage: string = "";

  ngOnInit(): void {
  }

  async doLogin(){
    try{
      this.isLoading = true;
      await this.loginService.login(this.user);
      this.router.navigateByUrl('/dashboard');
      this.loginService.setUserAuth(true);
    } catch (error){
      this.errorMessage = "Usuário e/ou senha incorretos. Por favor, tente novamente.";
      this.loginService.setUserAuth(false);
    } finally {
      this.isLoading = false;
    }
  }

  getUserAuth(){
    return this.userAuth;
  }

  showErrorMessage(){
    return this.errorMessage.length != 0;
  }

}
