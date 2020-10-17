import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-questionnaire-view',
  templateUrl: './questionnaire-view.component.html',
  styleUrls: ['./questionnaire-view.component.scss']
})
export class QuestionnaireViewComponent implements OnInit {

  private questionnaireId = 0;

  public questionnaire: Questionnaire;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionnaire = new Questionnaire();
    this.questionnaireId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getQuestionnaire();
  }


  private getQuestionnaire() {
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/get/' + this.questionnaireId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnaire = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

}
