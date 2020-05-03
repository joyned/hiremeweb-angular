import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() diameter: number = 100;
  @Input() showText: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
