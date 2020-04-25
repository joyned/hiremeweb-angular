import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  public image: any;

  ngOnInit(): void {
  }

  setImage(event){
    this.image = event.target.files[0];
  }

}
