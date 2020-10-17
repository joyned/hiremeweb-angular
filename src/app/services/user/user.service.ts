import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  private usersProfiles = [];

  async registerNewUser(user) {
    await this.api.post('register', user, {})
      .then(
        (res: any) => {
        });
  }
}
