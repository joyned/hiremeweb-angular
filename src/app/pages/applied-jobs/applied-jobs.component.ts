import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from '../../services/applied-jobs/applied-jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  constructor(private service: AppliedJobsService, private dialog: MatDialog) { }

  public jobs: any = [];
  public isLoading = true;

  public dialogJobTitle: string;
  public dialogJobId: number;

  ngOnInit(): void {
    console.log("entrou");
    
    this.getAppliedJobs();
  }

  async getAppliedJobs(){
    this.isLoading = true;
    this.jobs = await this.service.getAppliedJobs();
    this.isLoading = false; 
  }

  jobDetails(id: number){
    this.dialog.open(JobDetailsComponent, {
      data: {
        job_id: id,
        show_button: false
      }
    });
  }

  cancelApply(dialog: any, jobId: number, jobTitle: string){
    this.dialogJobId = jobId;
    this.dialogJobTitle = jobTitle;
    this.dialog.open(dialog);
  }

  async cancel(){
    try{
      await this.service.cancelApply(this.dialogJobId);
    } catch (error){
      console.error(error);
    } finally {
      this.getAppliedJobs();
      this.dialog.closeAll();
    }
  }

  close(){
    this.dialog.closeAll();
  }

}
