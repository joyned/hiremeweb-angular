import { Component, ViewEncapsulation } from '@angular/core';
import { AlertMessageService } from './services/alert-message/alert-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AlertMessageService]
})
export class AppComponent {
  title = 'hire-me';

  constructor() { }
}
