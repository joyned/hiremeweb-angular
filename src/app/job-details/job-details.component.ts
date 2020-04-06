import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobDetailService } from '../services/job-detail/job-detail.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private jobService: JobDetailService) { }

  public job: any;
  public isLoading = false;

  ngOnInit(): void {
    this.getJobDetail();
  }

  backToList(){
    this.router.navigateByUrl('/jobs')
  }

  async getJobDetail(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.job = await this.jobService.getJobDetailById(id);
    this.isLoading = false;
  }

}
