import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { ApiService } from '../api/api.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data: Object;

  private userAuth = false;

  public token: any;

  constructor(private api: ApiService) { }

  async login(user: User){
    this.data = await this.api.post('login', user);
    this.token = this.data['idToken']
  }

  getUserAuth(){
    return this.userAuth;
  }

  setUserAuth(state: boolean){
    this.userAuth = state;
  }

}
