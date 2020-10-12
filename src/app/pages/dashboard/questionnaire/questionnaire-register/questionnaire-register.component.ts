import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { QuestionnaireQuestion } from 'src/app/classes/questionnaire/questionnaire-question';
import { QuestionnaireQuestionOption } from 'src/app/classes/questionnaire/questionnaire-question-option';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-questionnaire-register',
  templateUrl: './questionnaire-register.component.html',
  styleUrls: ['./questionnaire-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionnaireRegisterComponent implements OnInit {

  public questionnaire: Questionnaire;
  public question: QuestionnaireQuestion;
  public answerTypes: SelectItem[];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.questionnaire = new Questionnaire();
    this.question = new QuestionnaireQuestion();

    this.answerTypes = [
      {
        label: 'Texto',
        value: 'T'
      },
      {
        label: 'Multipla escolha',
        value: 'E'
      }
    ];
  }

  public saveQuestionnaire() {
    this.http.post<any>(ApiUtil.getPath() + 'questionnaire/create', this.questionnaire, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public addOption() {
    if (this.question.questionnaireQuestionOption.length < 5) {
      this.question.questionnaireQuestionOption.push(new QuestionnaireQuestionOption());
    }
  }

  public removeOption(option: QuestionnaireQuestionOption) {
    const index = this.question.questionnaireQuestionOption.indexOf(option, 0);
    if (index > -1) {
      this.question.questionnaireQuestionOption.splice(index, 1);
    }
  }

  public addQuestion() {
    console.log(this.question)
    this.questionnaire.questionnaireQuestions.push(this.question);
    this.question = new QuestionnaireQuestion();
  }

  public sanitizerString(string: string) {
    let temp = this.sanitizer.bypassSecurityTrustHtml(string);
    return temp;
  }

}
