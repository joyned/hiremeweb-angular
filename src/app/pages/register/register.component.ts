import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/classes/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild("error") errorDialog: TemplateRef<any>;
  @ViewChild("loading") loadingDialog: TemplateRef<any>;
  
  public errorMessage: any;

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.router.navigate
  }

  public isLoading = false;

  public user = {
    email: '',
    user: '',
    password: '',
    confirmPassword: '',
    name: '',
    cpf: '',
    rg: '',
    fullname: '',
    birthDate: '',
    city: '',
    state: '',
    country: '',
    address: '',
    addressNumber: '',
    zipCode: '',
    complement: '',
  }

  async register(){
    this.isLoading = true;
    try{
      this.createLoadingDialog();
      await this.userService.registerNewUser(this.user);
      this.dialog.closeAll();
      let user = new User();
      user.user = this.user.user;
      user.password = this.user.password;
      await this.loginService.login(user);
      this.router.navigateByUrl('/');
    } catch (error) {
      this.errorMessage = error.error;
      this.createErrorDialog();
    } finally {
      this.isLoading = false;
    }
  }

  createErrorDialog(){
    this.dialog.closeAll();
    this.dialog.open(this.errorDialog);
  }

  createLoadingDialog(){
    this.dialog.closeAll();
    this.dialog.open(this.loadingDialog);
  }
}
