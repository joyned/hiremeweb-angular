import { Component, OnInit, Input, Inject, ContentChild, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobDetailService } from 'src/app/services/job-detail/job-detail.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  constructor(private jobService: JobDetailService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public param: any) { }

  @ViewChild('dialogApplyConfirmed') dialogApplyConfirmed;

  private currentDialog: any;

  public job: any;
  public isLoading = false;
  public showButton = true;

  ngOnInit(): void {
    this.getJobDetail();
    this.showButton = this.param.show_button;
  }

  closeDialog() {
    this.currentDialog.close();
  }

  apply() {
    try {
      this.jobService.applyToJob(this.param.job_id);
    } catch (error) {
      console.log('Error: ' + error);
      this.dialog.closeAll();
      this.dialog.open(ErrorDialogComponent);
    } finally {
      this.dialog.closeAll();
      this.currentDialog = this.dialog.open(this.dialogApplyConfirmed);
      setTimeout(() => this.dialog.closeAll(), 4000);
    }
  }

  userLogged() {
    return localStorage.getItem('token') != null;
  }

  openDialog(modal: any) {
    this.currentDialog = this.dialog.open(modal);
  }

  async getJobDetail() {
    this.isLoading = true;
    this.job = await this.jobService.getJobDetailById(this.param.job_id);
    this.isLoading = false;
  }

}
