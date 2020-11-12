import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { DatasharingService } from 'src/app/services/data-sharing/datasharing.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  public pages: any[] = [];
  public viewportHeight: number;
  public items: MenuItem[] = [];

  constructor(private router: Router, private dataSharingService: DatasharingService, private http: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('user');

    if (!this.userName) {
      this.dataSharingService.userName.subscribe(value => {
        this.userName = value;
      });

      this.dataSharingService.pages.subscribe(value => {
        this.pages = value;
        this.initMenu();
      });
    }

    if (this.userName && this.pages.length === 0) {
      this.getPages();
    }
  }

  private getPages() {
    this.http.get<any>(ApiUtil.getPath() + 'pages/', ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.pages = data.payload;
          this.initMenu();
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
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
        command: () => this.redirectToPage('/about-us')
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
    const subItens = [];

    this.pages.forEach(page => {
      const constant = page.constant;
      const item = {
        label: page.name,
        command: () => this.redirectToPage(constant)
      };
      subItens.push(item);
    });

    subItens.push(
      { separator: true },
      {
        label: 'Sair',
        command: () => this.logout()
      }
    );
    this.items.push({
      label: this.userName,
      items: subItens,
      command: () => this.doNothing()
    });
  }

  redirectToPage(page: any) {
    this.router.navigateByUrl(page);
  }

  openDialog() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userName = '';
    window.location.reload();
    this.router.navigateByUrl('/home');
  }

  private doNothing() {
    // Do nothing
  }

  public goHome() {
    this.redirectToPage('/home');
  }

}
