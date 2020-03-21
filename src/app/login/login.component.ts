import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user/user';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private api: ApiService) { }

  public user: User;
  public response: any;
  public data: any;

  ngOnInit(): void {
  }

  async redirectToDashboard(){
    //this.response = await this.api.get('test', {});
    //this.response.then((result: any) => { this.data = result});
    this.getResult();
    console.log(this.data);
    
    this.router.navigateByUrl('/dashboard');
  }

  async getResult(){
    try{
      this.data = await this.api.getResult('test', {});
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      console.log(this.data);
    }
  }

}
