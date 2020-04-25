import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

  @Input() placeholder: string;
  @Input() width: number;

  constructor() { }

  ngOnInit(): void {
  }

}
