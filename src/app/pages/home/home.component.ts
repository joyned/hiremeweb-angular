import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) {
  }

  public component: any;
  public states = [];


  ngOnInit(): void {
  }

  async getAllStates() {
    this.states = await this.homeService.getStates();
    console.log(this.states);
  }

}
