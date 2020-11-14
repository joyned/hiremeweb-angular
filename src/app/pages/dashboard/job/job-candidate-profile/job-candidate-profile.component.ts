import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-job-candidate-profile',
  templateUrl: './job-candidate-profile.component.html',
  styleUrls: ['./job-candidate-profile.component.scss']
})
export class JobCandidateProfileComponent implements OnInit {

  private candidateId: number;
  public candidate: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.candidateId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCandidateProfile();
  }

  private getCandidateProfile() {
    console.log(this.candidateId)
    this.http.get<any>(ApiUtil.getPath() + 'person/profile/' + this.candidateId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.candidate = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public transformDate(date: string) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

}
