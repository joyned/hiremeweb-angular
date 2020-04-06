import { Component, ComponentFactory, OnInit } from '@angular/core';
import { JobsComponent } from './jobs/jobs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hire-me';
  public userName: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.getUserName()
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
