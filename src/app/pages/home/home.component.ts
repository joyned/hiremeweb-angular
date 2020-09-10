import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }


  public openJobs(){
    this.route.navigateByUrl('/jobs');
  }

}
