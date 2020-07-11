import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/classes/user/user';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('error') errorDialog: TemplateRef<any>;
  @ViewChild('loading') loadingDialog: TemplateRef<any>;
  public errorMessage: any;
  public emptyFields = '';
  public isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private loginService: LoginService) { }
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
  };

  ngOnInit(): void {
  }

  async register() {
    this.isLoading = true;
    if (this.validateFields() && this.checkDate(this.user.birthDate)) {
      try {
        this.createLoadingDialog();
        await this.userService.registerNewUser(this.user);
        this.dialog.closeAll();
        const user = new User();
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
  }

  createErrorDialog() {
    this.dialog.closeAll();
    this.dialog.open(this.errorDialog);
  }

  createLoadingDialog() {
    this.dialog.closeAll();
    this.dialog.open(this.loadingDialog);
  }

  validateFields() {
    this.emptyFields = '';
    console.log(this.user);
    if (this.user.email === '') {
      this.emptyFields += '<li>Email</li>';
    }
    if (this.user.user === '') {
      this.emptyFields += '<li>Usuário</li>';
    }
    if (this.user.password === '') {
      this.emptyFields += '<li>Senha</li>';
    }
    if (this.user.confirmPassword === '') {
      this.emptyFields += '<li>Confirmar senha</li>';
    }
    if (this.user.name === '') {
      this.emptyFields += '<li>Nome</li>';
    }
    if (this.user.cpf === '') {
      this.emptyFields += '<li>CPF</li>';
    }
    if (this.user.rg === '') {
      this.emptyFields += '<li>RG</li>';
    }
    if (this.user.fullname === '') {
      this.emptyFields += '<li>Nome completo</li>';
    }
    if (this.user.birthDate === '') {
      this.emptyFields += '<li>Data de nascimento</li>';
    }
    if (this.user.city === '') {
      this.emptyFields += '<li>Cidade</li>';
    }
    if (this.user.state === '') {
      this.emptyFields += '<li>Estado</li>';
    }
    if (this.user.country === '') {
      this.emptyFields += '<li>Pais</li>';
    }
    if (this.user.address === '') {
      this.emptyFields += '<li>Endereço</li>';
    }
    if (this.user.addressNumber === '') {
      this.emptyFields += '<li>Número</li>';
    }
    if (this.user.zipCode === '') {
      this.emptyFields += '<li>CEP</li>';
    }
    if (this.user.complement === '') {
      this.emptyFields += '<li>Complemento</li>';
    }

    console.log(this.emptyFields);

    return this.emptyFields !== '' ? false : true;
  }

  checkDate(date) {
    const getvalue = date.split('/');
    console.log(date);
    const day = getvalue[2];
    const month = getvalue[1];
    const year = getvalue[0];
    if (year < 1901 && year > 2100) {
      return false;
    }
    if (month < 1 && month > 12) {
      return false;
    }
    if (day < 1 && day > 31) {
      return false;
    }
    if ((month === 4 && month === 6 && month === 9 && month === 11) && day === 31) {
      return false;
    }
    if (month === 2) {
      const isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
      if (day > 29 || (day === 29 && !isleap)) {
        return false;
      }
    } else {
      return true;
    }
  }

}
