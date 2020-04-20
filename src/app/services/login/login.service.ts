import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { ApiService } from '../api/api.service';
import { throwError } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data: Object;

  private userAuth = false;

  constructor(private api: ApiService) { }

  async login(user: User){
    this.data = await this.api.post('login', user);
    localStorage.setItem('token', this.data['token']);
    localStorage.setItem('user', this.data['user_name']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  

}
