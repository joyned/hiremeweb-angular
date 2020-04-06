import { Component, OnInit, Input } from '@angular/core';
import { JobsComponent } from '../jobs/jobs.component';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() page: any;

  ngOnInit(): void {
  }

  loadPage(page: any){
    if(page == "Jobs"){
      this.page = JobsComponent;
    }
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  alert(){
    console.log('teste');
  }

}
