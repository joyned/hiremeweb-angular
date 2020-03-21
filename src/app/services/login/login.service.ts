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

  constructor(private api: ApiService) { }

  async validUser(user: User){
    this.data = await this.api.post('login', user);
    const res = String(this.data['success']);
    if(res == "false"){
      this.userAuth = false;
      throw throwError("invalid user");
    }
    this.userAuth = true;
  }

  getUserAuth(){
    return this.userAuth;
  }

}
