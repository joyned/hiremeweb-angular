import { Component, OnInit, Input } from '@angular/core';
import { JobsComponent } from '../jobs/jobs.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  @Input() page: any;

  ngOnInit(): void {
  }

  loadPage(page: any){
    if(page == "Jobs"){
      this.page = JobsComponent;
    }
  }

}
