import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  userName: string;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog) {}

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

  logout(){
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
    } else if(page == 'Config') {
      this.router.navigateByUrl('/config');
    }
  }

}
