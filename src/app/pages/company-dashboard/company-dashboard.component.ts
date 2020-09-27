import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public jobs: Job[] = [];
  public thirtyDaysChart: any[];

  public dataToThirtyDaysChart: any;

  ngOnInit(): void {
    this.getJobsByUserId();
    this.getDataTo30Chart();
  }


  public getJobsByUserId() {
    this.http.get<any>(ApiUtil.getPath() + 'job/jobs-by-user', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.jobs = data.payload;
          console.log(data.payload);
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  public getDataTo30Chart() {
    this.http.get<any>(ApiUtil.getPath() + 'job/applied-jobs/chart/30-days', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.thirtyDaysChart = data.payload;
          this.buildThirtyDayChart();
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  private buildThirtyDayChart() {
    const data = this.buildDaysOfMoth();
    this.dataToThirtyDaysChart = {
      labels: data.days,
      datasets: [
        {
          label: 'Aplicações',
          data: data.data,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    }
  }

  private buildDaysOfMoth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month, 0).getDate();

    let daysInMonthList = {
      days: [],
      data: []
    };

    for (let i = 0; i < daysInMonth; i++) {
      daysInMonthList.days.push(i);
      this.thirtyDaysChart.forEach(obj => {
        let date = new Date(obj.date);
        let d1 = new Date(year, month, i);
        d1.setHours(0,0,0,0);
        date.setHours(0,0,0,0);
        if(date.getTime() === d1.getTime()) {
          daysInMonthList.data.push(obj.total);
        }
      });
      daysInMonthList.data.push(0);
    }
    console.log(daysInMonthList);

    return daysInMonthList;
  }

}
