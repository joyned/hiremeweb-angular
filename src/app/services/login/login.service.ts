import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data: any;

  constructor(private api: ApiService) { }

  async login(user: User) {
    this.data = await this.api.post('login', user, {});
    localStorage.setItem('token', this.data.token);
    localStorage.setItem('user', this.data.user_name);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
