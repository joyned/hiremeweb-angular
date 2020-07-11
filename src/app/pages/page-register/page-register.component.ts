import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {

  constructor(private userService: UserService) { }
  public isLoading = true;
  public profiles = [];

  public pageRegister = {
    pageName: '',
    pageURL: '',
    pagePermission: []
  };

  ngOnInit(): void {
    this.getProfiles();
  }

  async getProfiles() {
    this.profiles = await this.userService.getUsersProfiles();
    this.isLoading = false;
  }

  save() {
    console.log(this.pageRegister);
  }

  checkEvent(event) {
    if (event.source._checked) {
      this.pageRegister.pagePermission.push(event.source.value);
    } else {
      const index = this.pageRegister.pagePermission.indexOf(event.source.value);
      this.pageRegister.pagePermission.splice(index, 1);
    }
  }
}
