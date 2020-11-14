import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() img: any;
  @Input() editable: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.img !== undefined) {
      this.img = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.img) as any)
        .changingThisBreaksApplicationSecurity;
    }
  }

  public changePersonPhoto(event): void {
    if (event.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.onload = e => this.img = reader.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public checkNull(){
    return this.img === 'data:image/jpg;base64,null';
  }

}
