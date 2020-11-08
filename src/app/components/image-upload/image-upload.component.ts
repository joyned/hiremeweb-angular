import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {

  @Input() img: any;
  @Input() editable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.img.currentValue !== undefined) {
    //   const reader = new FileReader();
    //   reader.onload = e => this.img = reader.result;
    //   console.log(changes.img.currentValue)
    //   reader.readAsDataURL(changes.img.currentValue);
    // }
  }

}
