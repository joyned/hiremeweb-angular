import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  private usersProfiles = [];

  async getUsersProfiles(){
    await this.api.getResult('users-profiles', {})
      .then(
        (res: any) => {
          this.usersProfiles = res;
        }
      )
    console.log(this.usersProfiles);
      
    return this.usersProfiles;
  }

  async registerNewUser(user){
    await this.api.post('register', user, {})
      .then(
        (res: any) => {
          console.log(res);
      });
  }
}
