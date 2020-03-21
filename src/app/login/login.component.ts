import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user/user';
import { ApiService } from '../services/api/api.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private api: ApiService, private loginService: LoginService) { }

  public user = new User();
  public data: any;

  ngOnInit(): void {
  }

  async doLogin(){
    try{
      await this.loginService.validUser(this.user);
      this.router.navigateByUrl('/dashboard');
    } catch (error){
      console.log(error);
    }
  }

}
