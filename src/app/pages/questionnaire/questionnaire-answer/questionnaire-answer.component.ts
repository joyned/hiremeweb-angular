import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-questionnaire-answer',
  templateUrl: './questionnaire-answer.component.html',
  styleUrls: ['./questionnaire-answer.component.scss']
})
export class QuestionnaireAnswerComponent implements OnInit {

  private questionnaireId: number;
  private approvalId: number;
  public view = false;
  public questionnaire: Questionnaire;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.questionnaireId = Number(this.activatedRoute.snapshot.paramMap.get('questionnaireId'));
    this.approvalId = Number(this.activatedRoute.snapshot.paramMap.get('approvalId'));
    this.view = Boolean(this.activatedRoute.snapshot.paramMap.get('view'));
    console.log(Boolean(this.activatedRoute.snapshot.paramMap.get('view')))
    this.getQuestionnaire();
  }

  private getQuestionnaire() {
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/get/response/' + this.questionnaireId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnaire = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public answerQuestionnaire() {
    console.log('teste');
    this.confirmationService.confirm({
      message: 'Deseja realmente enviar o questionário?',
      header: this.questionnaire.title,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.answer()
    });
  }

  private answer() {
    const body = {
      approvalId: this.approvalId,
      questionnaire: this.questionnaire
    }
    this.http.post<any>(ApiUtil.getPath() + 'questionnaire/answer', body, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Sua resposta foi salva com sucesso. Agora só esperar pela empresa avaliar seu questionário.');
        }),
        catchError((httpErrorResponse) => {
          if (httpErrorResponse.error.payload === 'already.answered') {
            this.alertMessageService.errorMessage('Questionário respondido', 'Você já respondeu esse questionário.');
          }
          return of();
        })
      ).subscribe();
  }

  scrollToElement(element): void {
    let el = document.getElementById(element);
    el.scrollIntoView();
  }

}
