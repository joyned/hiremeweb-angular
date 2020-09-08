import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PageService } from 'src/app/services/pages/page.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  styles: [`
      :host ::ng-deep .ui-slidemenu {
          width: 13.5em
      }
  `],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  public userName: string;
  public pages: any;
  public viewportHeight: number;

  public items: MenuItem[];

  constructor(private router: Router, private dialog: MatDialog, private pageService: PageService) { }

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('user');
    if (this.userName) {
      this.pages = await this.pageService.getPagesByUserId();
    }
    this.initMenu();
  }

  initMenu() {
    this.items = [
      {
        label: 'Página principal',
        command: () => this.redirectToPage('/home')
      },
      {
        label: 'Vagas',
        command: () => this.redirectToPage('/jobs')
      },
      {
        label: 'Para empresas',
      },
      {
        label: 'Sobre nós',
      }
    ];

    if (!this.userName) {
      this.items.push({
        label: 'Entrar/Registrar',
        command: () => this.openDialog()
      });
    } else {
      this.buildDynamicSubMenu();
    }
  }

  buildDynamicSubMenu() {
    let subItens = [];
    for (var index in this.pages) {
      let constant = this.pages[index].constant;
      let item = {
        label: this.pages[index].name,
        command: () => this.redirectToPage(constant)
      }
      subItens.push(item);
    }
    subItens.push(
      { separator: true },
      {
        label: 'Sair',
        command: () => this.logout()
      }
    );
    this.items.push({
      label: this.userName,
      items: subItens
    });
  }

  redirectToPage(page: any) {
    this.router.navigateByUrl(page);
  }

  openDialog() {
    // this.dialog.open(LoginComponent);
    this.router.navigateByUrl('/login/');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userName = '';
    window.location.reload();
    this.router.navigateByUrl('/home');
  }

}
