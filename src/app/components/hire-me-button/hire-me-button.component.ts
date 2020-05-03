import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hire-me-button',
  templateUrl: './hire-me-button.component.html',
  styleUrls: ['./hire-me-button.component.scss']
})
export class HireMeButtonComponent implements OnInit {
  
  @Input() buttonTitle: any;
  @Input() width: number;
  constructor() { }


  ngOnInit(): void {
  }

}
