import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public options: SelectItem[] = [
    {
      label: 'Empresa',
      value: 'Empresa'
    },
    {
      label: 'Candidato',
      value: 'Empresa'
    }
  ];

  public contact = {
    email: '',
    name: '',
    position: 'Empresa',
    message: ''
  }

  constructor(private route: Router, private http: HttpClient, private alertMessageService: AlertMessageService) {
  }

  ngOnInit(): void {
  }


  public openJobs() {
    this.route.navigateByUrl('/jobs');
  }

  public sendContactEmail(){
    this.http.post(ApiUtil.getPath() + 'contact', this.contact, {})
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Seu contato foi enviado para nosso time. Fique de olho no seu email :).');
        }),
        catchError((httpErrorResponse) => {
          return of()
        })
      ).subscribe();
  }

}
