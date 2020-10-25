import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Questionnaire } from 'src/app/classes/questionnaire/questionnaire';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit {

  public questionnairies: Questionnaire[];

  constructor(private router: Router, private http: HttpClient, private alertMessageService: AlertMessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.questionnairies = [];
    this.listQuestionnaires();
  }

  public listQuestionnaires() {
    this.http.get<any>(ApiUtil.getPath() + 'questionnaire/list/simple', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.questionnairies = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public deleteQuestionnaire(questionnaire: Questionnaire) {
    this.confirmService.confirm({
      header: questionnaire.title,
      message: 'Deseja realmente deletar o questionário ' + questionnaire.title + '?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.confirmDelete(questionnaire.id)
    });
  }

  private confirmDelete(id: number) {
    this.http.delete<any>(ApiUtil.getPath() + 'questionnaire/delete/' + id, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso.', 'Questionário excluido com sucesso.');
          this.listQuestionnaires();
        }),
        catchError((httpErrorResponse) => {
          if (httpErrorResponse.error.payload === 'not.editable.questionnaire') {
            this.alertMessageService
              .errorMessage('Erro.', 'Não foi possivel excluir esse questionário. Ele está relacionado a um processo seletivo.');
          }
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

  public editQuestionnaire(questionnaireId: number) {
    this.router.navigate(['/dashboard/questionnaire', { id: questionnaireId }]);
  }

}
