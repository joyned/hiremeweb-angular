import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { PageService } from 'src/app/services/pages/page.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  public userName: string;
  public pages: any;

  constructor(private router: Router, private dialog: MatDialog, private pageService: PageService) { }

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('user');
    if(this.userName){
      this.pages = await this.pageService.getPagesByUserId();
    }
  }

  redirectToPage(page: any) {
    this.router.navigateByUrl(page);
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userName = '';
    window.location.reload();
    this.router.navigateByUrl('/home');
  }

}
