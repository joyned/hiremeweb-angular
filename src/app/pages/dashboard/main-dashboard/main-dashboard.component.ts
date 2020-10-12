import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from 'src/app/classes/job/job';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { JobCandidatesComponent } from '../job/job-candidates/job-candidates.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  public thirtyDaysChart: any[];
  public dataToThirtyDaysChart: any;

  ngOnInit(): void {
    this.getDataTo30Chart();
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
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
        d1.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        if (date.getTime() === d1.getTime()) {
          daysInMonthList.data.push(obj.total);
        }
      });
      daysInMonthList.data.push(0);
    }
    console.log(daysInMonthList);

    return daysInMonthList;
  }
}
