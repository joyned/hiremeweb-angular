import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private alertMessage: AlertMessageService) {
  }

  ngOnInit(): void {
  }

}
