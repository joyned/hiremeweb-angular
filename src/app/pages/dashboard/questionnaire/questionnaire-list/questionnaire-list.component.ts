import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit {

  public questionnairies: Questionnaire[];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.questionnairies = [];
    this.listQuestionnaires();
  }

  public listQuestionnaires() {
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnairies = data.payload;
          console.log(this.questionnairies);
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }


  public redirectToRegister() {
    this.router.navigateByUrl('/dashboard/questionnaire');
  }

  public viewQuestionnaire(questionnaireId: number) {
    this.router.navigate(['/dashboard/questionnaire/view', { id: questionnaireId }]);
  }

}
