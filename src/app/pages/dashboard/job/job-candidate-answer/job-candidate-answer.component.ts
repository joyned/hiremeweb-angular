import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { QuestionnaireQuestionAnswerCorrection } from 'src/app/classes/questionnaire/QuestionnaireQuestionAnswerCorrection';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-job-candidate-answer',
  templateUrl: './job-candidate-answer.component.html',
  styleUrls: ['./job-candidate-answer.component.scss']
})
export class JobCandidateAnswerComponent implements OnInit {

  public questionnaire: Questionnaire;
  public correctionList: QuestionnaireQuestionAnswerCorrection[];
  public canCorrect = false;

  private personId: number;
  private jobId: number;
  private questionnaireId: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.personId = Number(this.activatedRoute.snapshot.paramMap.get('personId'));
    this.jobId = Number(this.activatedRoute.snapshot.paramMap.get('jobId'));
    this.questionnaireId = Number(this.activatedRoute.snapshot.paramMap.get('questionnaireId'));
    this.correctionList = [];
    this.getAnswers();
  }

  private getAnswers() {
    const body = {
      personId: this.personId,
      jobId: this.jobId,
      questionnaireId: this.questionnaireId
    };

    this.http.post<any>(ApiUtil.getPath() + 'questionnaire/view/answers', body, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnaire = data.payload;
          this.questionnaire.questionnaireQuestions.forEach(obj => {
            if(obj.questionnaireCorrect){
              this.canCorrect = false;
            }
          })
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public markAsCorret(id: number) {
    const correct = {
      answerId: id,
      correct: 'T'
    };

    this.correctionList = this.correctionList.filter(function (obj) {
      return obj.answerId !== id;
    });

    this.correctionList.push(correct);
  }

  public markAsNotCorret(id: number) {
    const nonCorrect = {
      answerId: id,
      correct: 'F'
    };

    this.correctionList = this.correctionList.filter(function (obj) {
      return obj.answerId !== id;
    });

    this.correctionList.push(nonCorrect);
  }

  public confirmCorrection() {
    this.confirmationService.confirm({
      header: 'Confirmar correção',
      message: 'Deseja realmente confirmar a correção? Não poderá ser desfeito.',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.saveCorrection()
    });
  }

  private saveCorrection() {
    if (this.correctionList.length === this.questionnaire.questionnaireQuestions.length) {
      console.log(this.correctionList);

      this.http.post<any>(ApiUtil.getPath() + 'questionnaire/correction', this.correctionList, ApiUtil.buildOptions())
        .pipe(
          tap((data: any) => {
            this.alertMessageService.successMessage('Sucesso', 'O questionário foi corrigido com sucesso');
          }),
          catchError((httpErrorResponse) => {
            this.alertMessageService.errorMessage('Erro', 'Falha ao corrigir o questinário. Tente novamente.');
            return of();
          })
        ).subscribe();

    } else {
      this.alertMessageService.errorMessage('Erro', 'Existem questões que não foram corrigidas');
    }
  }

}
