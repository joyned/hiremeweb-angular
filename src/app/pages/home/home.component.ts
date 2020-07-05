import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router, config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  public component: any;
  public states = [];

  public images = [
    '../../../assets/img/world.jpg',
    '../../../assets/img/galaxy.jpg',
    '../../../assets/img/particulas.jpg'
  ]

  ngOnInit(): void {
    this.getAllStates();
  }

  async getAllStates() {
    this.states = await this.homeService.getStates();
    console.log(this.states);
  }

}
