import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public image: any;

  ngOnInit(): void {
  }

  setImage(event) {
    this.image = event.target.files[0];
  }

  sendEmail(dialog: any) {
    this.dialog.open(dialog);
    setTimeout(() => this.closeDialog(), 10000);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
