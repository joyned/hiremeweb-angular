import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private dialog: MatDialog) { }

  public user = {
    email: '',
    usuario: '',
    senha: '',
    senhaConfirmada: ''
  }

  ngOnInit(): void {
  }

  async passwordMatch(){
    console.log(this.user.senha);
    console.log(this.user.senhaConfirmada);
    if((this.user.senha == this.user.senhaConfirmada)){
      return true;
    }
    return false;
  }

  async register(){
    if(await this.passwordMatch()){
      this.dialog.closeAll();
      this.router.navigateByUrl('/registerfull');
    }
  }

}
