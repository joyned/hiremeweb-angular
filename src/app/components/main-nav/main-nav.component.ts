import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PageService } from 'src/app/services/pages/page.service';

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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog, private pageService: PageService) {}

  public pages = [];

  ngOnInit(): void {
    this.getUserNameAndLoadPages()
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

  async getUserNameAndLoadPages(){
    if(localStorage.getItem('user') != undefined){
      this.userName = localStorage.getItem('user');
      this.pages = await this.pageService.getPagesByUserId(localStorage.getItem('user_id'));
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
    localStorage.removeItem('user_id');
    localStorage.removeItem('candidate_id');
    this.userName = "";
    this.router.navigateByUrl('/home');
  }

  redirectToPage(page: any){
    this.router.navigateByUrl(page);
  }

}
