import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Job } from '../classes/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private rootComponent: AppComponent) { }

  displayedColumns: string[] = ['title', 'location', 'edit'];

  public isEditing: boolean;
  public job: Job;
  public jobs: Array<Job> = [];

  ngOnInit(): void {
    this.isEditing = false;
  }

  addNewJob(){
    this.isEditing = true;
    this.job = new Job();
  }

  back(){
    this.isEditing = false;
    this.job = new Job();
  }

  save(){
    console.log(this.job);
  }

}
