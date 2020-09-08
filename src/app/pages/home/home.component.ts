import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private alertMessage: AlertMessageService) {
  }

  public options: SelectItem[] = [
    {
      label: 'Empresa',
      value: 'E'
    },
    {
      label: 'Candidato',
      value: 'C'
    }
  ]

  ngOnInit(): void {
  }

}
