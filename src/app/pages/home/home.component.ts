import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
      value: 'E'
    },
    {
      label: 'Candidato',
      value: 'C'
    }
  ];

  constructor(private route: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>('http://development-hireme.eastus.cloudapp.azure.com/api/', {})
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError((httpErrorResponse) => {
          return of()
        })
      ).subscribe();
  }


  public openJobs() {
    this.route.navigateByUrl('/jobs');
  }

}
