import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JobFilter } from 'src/app/classes/job-filter/job-filter';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  public jobFilter: JobFilter;
  public jobs: Job[] = [];

  public loading = false;

  ngOnInit() {
    this.jobFilter = new JobFilter();
    this.listJobs();
  }

  listJobs() {
    this.loading = true;

    this.http.get<any>(ApiUtil.getPath() + 'job/all')
      .pipe(
        tap((data) => {
          this.jobs = data.payload;
          console.log(data.payload)
        }),
        catchError((httpResponseError) => {
          return of();
        })
      ).subscribe();

    this.loading = false;
  }

  filter() {
    this.loading = true;

    this.http.post<any>(ApiUtil.getPath() + 'job/filter', this.jobFilter)
      .pipe(
        tap((data) => {
          this.jobs = data.payload;
        }),
        catchError((httpResponseError) => {
          return of();
        })
      ).subscribe();

    this.loading = false;
  }

  jobDetails(job: Job) {
    this.router.navigate(['/jobs-detail', job.id]);
  }

}