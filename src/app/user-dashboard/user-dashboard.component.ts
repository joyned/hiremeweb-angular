import { Component, OnInit } from '@angular/core';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  public page: any;

  ngOnInit(): void {
  }

  loadPage(page: any){
    if(page == "Jobs"){
      console.log("entrei");
      
      this.page = JobsComponent;
    }
  }

}
