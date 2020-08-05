import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() diameter = 100;
  @Input() showText = false;

  constructor() { }

  ngOnInit(): void {
  }

}
