import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hire-me-title',
  templateUrl: './hire-me-title.component.html',
  styleUrls: ['./hire-me-title.component.scss']
})
export class HireMeTitleComponent {

  @Input() text: string;

  constructor() { }
}
