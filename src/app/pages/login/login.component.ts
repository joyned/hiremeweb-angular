import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/classes/user/user';

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
      this.router.navigateByUrl('/home');
    } catch (error){
      console.log(error);
      this.errorMessage = "Usuário e/ou senha incorretos. Por favor, tente novamente.";
    } finally {
      this.isLoading = false;
    }
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  getUserAuth(){
    return this.userAuth;
  }

  showErrorMessage(){
    return this.errorMessage.length != 0;
  }

}
