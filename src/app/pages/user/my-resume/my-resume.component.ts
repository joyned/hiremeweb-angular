import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProfessionalHistory } from 'src/app/classes/candidate/professional-history';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyResumeComponent implements OnInit {

  public professionalHistories: ProfessionalHistory[];
  public professionalHistory: ProfessionalHistory;
  public pt: any;
  public dialogOpened = false;
  public abilities: string[];

  constructor(private http: HttpClient, public datepipe: DatePipe, private alertMessageService: AlertMessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAbilities();
    this.professionalHistory = new ProfessionalHistory();
    this.getProfessionalHistory();
    this.buildCalendar();
    this.abilities = [];
  }

  public getProfessionalHistory() {
    this.http.get<any>(ApiUtil.getPath() + 'person/professional/history/get', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.professionalHistories = data.payload;
          this.professionalHistories.forEach(el => {
            el.initialDate = new Date(el.initialDate);
            el.finalDate = new Date(el.finalDate);
          });
        }),
        catchError((httpErrorReponse) => {
          return of();
        })
      ).subscribe();
  }

  public getAbilities() {
    this.http.get<any>(ApiUtil.getPath() + 'person/abilities/get', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.abilities = data.payload;
        }),
        catchError((httpErrorReponse) => {
          return of();
        })
      ).subscribe();
  }

  public addProfessionalHistory() {
    this.professionalHistory = new ProfessionalHistory();
    this.dialogOpened = true;
  }

  public editProfessionalHistory(professionalHistory: ProfessionalHistory) {
    this.professionalHistory = Object.assign({}, professionalHistory);
    this.dialogOpened = true;
  }

  public closeDialog() {
    this.dialogOpened = false;
    this.professionalHistory = new ProfessionalHistory();
  }

  public saveProfessionalHistory() {
    this.http.put<any>(ApiUtil.getPath() + 'person/professional/history', this.professionalHistory, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.getProfessionalHistory();
          this.dialogOpened = false;
          this.alertMessageService.successMessage('Sucesso', 'O seu historico profissional foi salvo com sucesso');
        }),
        catchError((httpErrorReponse) => {
          this.dialogOpened = false;
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao atualizar o historico profissional. Por favor, tente novamente');
          return of();
        })
      ).subscribe();
  }

  private buildCalendar() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
        'setembro', 'outubro', 'novembro', 'dezembro'],
      monthNamesShort: ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'],
      today: 'Hoje',
      clear: 'Apagar'
    };
  }

  public convertDate(date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  public saveAbilities() {
    this.http.post<any>(ApiUtil.getPath() + 'person/abilities', this.abilities, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Suas habilidades foram salvas com sucesso.');
        }),
        catchError((httpErrorReponse) => {
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao salvar. Tente novamente.');
          return of();
        })
      ).subscribe();
  }

  public showDeleteDialog(professionalHistory: ProfessionalHistory) {
    this.confirmationService.confirm({
      header: 'Excluir histórico',
      message: 'Tem certeza que deseja excluir esse histórico? Não pode ser revertido.',
      accept: () => this.deleteProfessionalHistory(professionalHistory.id),
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    })
  }

  private deleteProfessionalHistory(professionalHistoryId: number) {
    this.http.delete<any>(ApiUtil.getPath() + 'person/professional/history/delete/' + professionalHistoryId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) =>{
          this.alertMessageService.successMessage('Sucesso', 'A exclusão foi feita com sucesso');
          this.getProfessionalHistory();
        }),
        catchError((httpErrorReponse) => {
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao excluir o histórico. Tente novamente.');
          return of();
        })
      ).subscribe();
  }

}
