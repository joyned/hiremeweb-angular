import { Component, ComponentFactory } from '@angular/core';
import { JobsComponent } from './jobs/jobs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hire-me';
}
