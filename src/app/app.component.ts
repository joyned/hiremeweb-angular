import { DatePipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertMessageService } from './services/alert-message/alert-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AlertMessageService, DialogService, DatePipe, ConfirmationService]
})
export class AppComponent {
  title = 'hire-me';

  constructor() { }
}
