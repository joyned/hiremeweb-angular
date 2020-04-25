import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { $ } from 'protractor';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {

  @Input() img: any;
  @Input() editable: boolean;

  faPencilAlt = faPencilAlt;

  constructor() { }

  ngOnInit(): void {
    console.log(this.img == undefined);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.img.currentValue);
    if(changes.img.currentValue != undefined){
      var reader = new FileReader();
      reader.onload = e => this.img = reader.result
      reader.readAsDataURL(changes.img.currentValue)
    }
  }

}
