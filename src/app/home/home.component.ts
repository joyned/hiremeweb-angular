import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home/home.service';
import { Router } from '@angular/router';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }

  public component: any;
  public states = [];

  ngOnInit(): void {
    this.getAllStates();
  }

  async getAllStates(){
    this.states = await this.homeService.getStates();
    console.log(this.states);
  }

}
