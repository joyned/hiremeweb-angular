import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { QuestionnaireQuestion } from 'src/app/classes/questionnaire/questionnaire-question';
import { QuestionnaireQuestionOption } from 'src/app/classes/questionnaire/questionnaire-question-option';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

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
  public editable = true;
  public loading = false;
  private questionnaireId: number;

  constructor(private http: HttpClient, private alertMessage: AlertMessageService, private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.questionnaire = new Questionnaire();
    this.questionnaireId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.questionnaireId) {
      this.getQuestionnaire();
      this.questionnaireEditable();
    }

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

  private getQuestionnaire() {
    this.loading = true;
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/get/' + this.questionnaireId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnaire = data.payload;
          this.loading = false;
        }),
        catchError((httpErrorResponse) => {
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  private questionnaireEditable() {
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/editable/' + this.questionnaireId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.editable = Boolean(data.payload);
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public saveQuestionnaire() {
    if (!this.questionnaire.title) {
      this.alertMessage.errorMessage('Erro', 'O titulo do questionário não pode ser vazio.');
    } else if (this.questionnaire.questionnaireQuestions.length < 1) {
      this.alertMessage.errorMessage('Erro', 'É preciso ter pelo menos uma questão no questionário.');
    } else {
      this.loading = true;
      this.http.put<any>(ApiUtil.getPath() + 'questionnaire', this.questionnaire, ApiUtil.buildOptions())
        .pipe(
          tap((data: any) => {
            if (this.questionnaire.id > 0) {
              this.alertMessage.successMessage('Sucesso.', 'Questionário atualizado com sucesso.');
            } else {
              this.alertMessage.successMessage('Sucesso.', 'Questionário criado com sucesso.');
            }
            this.questionnaire.id = Number(data.payload.questionnaire);
            this.loading = false;
          }),
          catchError((httpErrorResponse) => {
            this.alertMessage.errorMessage('Erro.', 'Falha ao salvar o questionário. Por favor, tente novamente.');
            this.loading = false;
            return of();
          })
        ).subscribe();
    }
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

  public saveQuestion() {
    if (this.question.answerType === 'E' && (this.question.questionnaireQuestionOption.length === 0
      || this.question.questionnaireQuestionOption.length < 2)) {
      this.alertMessage.errorMessage('Erro', 'Para uma questão multipla escolha, é preciso ter pelo menos 2 opções.');
    } else if (!this.question.questionTitle) {
      this.alertMessage.errorMessage('Erro', 'O texto da questão não pode ser vazio.');
    } else {
      if (this.questionnaire.questionnaireQuestions === undefined) {
        this.questionnaire.questionnaireQuestions = [];
      }

      if (this.question.id !== 0) {
        const index = this.questionnaire.questionnaireQuestions.indexOf(this.question, 0);
        if (index > -1) {
          this.questionnaire.questionnaireQuestions.splice(index, 1);
        }
      }
      this.questionnaire.questionnaireQuestions.push(this.question);
      this.question = undefined;
    }
  }

  public addQuestion() {
    this.question = new QuestionnaireQuestion();
  }

  public editQuestion(question: QuestionnaireQuestion) {
    this.question = question;
  }

}
