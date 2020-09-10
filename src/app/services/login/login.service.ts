import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { ApiService } from '../api/api.service';
import { MenuBarComponent } from 'src/app/components/menu-bar/menu-bar.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data: any;

  constructor(private api: ApiService) { }

  async login(user: User) {
    this.data = await this.api.post('login', user, {});
    localStorage.setItem('token', this.data.payload.token);
    localStorage.setItem('user', this.data.payload.person_name);

    return this.data;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
