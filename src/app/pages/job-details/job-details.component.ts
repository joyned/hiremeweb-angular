import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobDetailService } from 'src/app/services/job-detail/job-detail.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private jobService: JobDetailService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public jobId: any) {}

  public job: any;
  public isLoading = false;

  ngOnInit(): void {
    this.getJobDetail();
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  apply(){
    console.log("Applied");
  }

  async getJobDetail(){
    this.isLoading = true;
    console.log(this.jobId['job_id']);
    this.job = await this.jobService.getJobDetailById(this.jobId['job_id']);
    console.log(this.job);
    this.isLoading = false;
  }

}
