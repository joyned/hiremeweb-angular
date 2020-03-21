import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private rootComponent: AppComponent) { }

  displayedColumns: string[] = ['title', 'location', 'edit'];

  public isEditing: boolean;

  public jobs: any = [
    {title: "DevOps", location:"São Paulo"},
    {title: "Front-end", location:"São Paulo"},
    {title: "Back-end", location:"São Paulo"},
    {title: "Malware Analyst", location:"São Paulo"},
  ];

  ngOnInit(): void {
    this.isEditing = false;
  }

  addNewJob(){
    this.isEditing = true;
  }

  back(){
    this.isEditing = false;
  }

}
