import { Component, ComponentFactory, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hire-me';
  public userName: string;

  constructor(private router: Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getUserName()
  }

  openDialog(type: string){
    if(type == 'Login'){
      this.dialog.open(LoginComponent);
    } else {
      this.dialog.open(RegisterComponent);
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  getUserName(){
    if(localStorage.getItem('user') != undefined){
      this.userName = localStorage.getItem('user');
    }
  }

  loginOrRegister(type: number){
    if(type == 1){
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/register');
    }
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userName = "";
    this.router.navigateByUrl('/home');
  }

  redirectToPage(page: any){
    if(page == 'Jobs'){
      this.router.navigateByUrl('/jobs');
    } else if(page == 'Home'){
      this.router.navigateByUrl('/home');
    }
  }
}
