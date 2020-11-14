import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProfessionalHistory } from 'src/app/classes/candidate/professional-history';
import { Person } from 'src/app/classes/person/person';
import { PersonEducation } from 'src/app/classes/person/PersonEducation';
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

  public personEducations: PersonEducation[];
  public personEducation: PersonEducation;

  public pt: any;
  public professionalHistoryDialog = false;
  public personEducationDialog = false;
  public abilities: string[];

  constructor(private http: HttpClient, public datepipe: DatePipe, private alertMessageService: AlertMessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.professionalHistory = new ProfessionalHistory();
    this.personEducation = new PersonEducation();
    this.getProfessionalHistory();
    this.getAbilities();
    this.getEducation();
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

  public getEducation() {
    this.http.get<any>(ApiUtil.getPath() + 'person/education/get', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.personEducations = data.payload;
          this.personEducations.forEach(el => {
            el.initialDate = new Date(el.initialDate);
            el.finalDate = new Date(el.finalDate);
          });
        }),
        catchError((httpErrorReponse) => {
          return of();
        })
      ).subscribe();
  }

  public addProfessionalHistory() {
    this.professionalHistory = new ProfessionalHistory();
    this.professionalHistoryDialog = true;
  }

  public editProfessionalHistory(professionalHistory: ProfessionalHistory) {
    this.professionalHistory = Object.assign({}, professionalHistory);
    this.professionalHistoryDialog = true;
  }

  public closeProfessionalHistoryDialog() {
    this.professionalHistoryDialog = false;
    this.professionalHistory = new ProfessionalHistory();
  }

  public addEducation() {
    this.personEducation = new PersonEducation();
    this.personEducationDialog = true;
  }

  public editEducation(education: PersonEducation) {
    this.personEducation = Object.assign({}, education);
    this.personEducationDialog = true;
  }

  public closeEducationDialog() {
    this.personEducationDialog = false
    this.personEducation = new PersonEducation();
  }

  public saveProfessionalHistory() {
    this.http.put<any>(ApiUtil.getPath() + 'person/professional/history', this.professionalHistory, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.getProfessionalHistory();
          this.professionalHistoryDialog = false;
          this.alertMessageService.successMessage('Sucesso', 'O seu historico profissional foi salvo com sucesso');
        }),
        catchError((httpErrorReponse) => {
          this.professionalHistoryDialog = false;
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao atualizar o historico profissional. Por favor, tente novamente');
          return of();
        })
      ).subscribe();
  }

  public saveEducation() {
    this.http.put<any>(ApiUtil.getPath() + 'person/education', this.personEducation, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.getEducation();
          this.personEducationDialog = false;
          this.alertMessageService.successMessage('Sucesso', 'O seu histórico de educação foi salvo com sucesso');
        }),
        catchError((httpErrorReponse) => {
          this.personEducationDialog = false;
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao salvar seu histórico de educação. Por favor, tente novamente');
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

  public showProfessionalHistoryDeleteDialog(professionalHistory: ProfessionalHistory) {
    this.confirmationService.confirm({
      header: 'Excluir',
      message: 'Tem certeza que deseja excluir esse histórico? Não pode ser revertido.',
      accept: () => this.deleteProfessionalHistory(professionalHistory.id),
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    })
  }

  public showEducationDeleteDialog(education: PersonEducation) {
    this.confirmationService.confirm({
      header: 'Excluir',
      message: 'Tem certeza que deseja excluir esse histórico de educação? Não pode ser revertido.',
      accept: () => this.deleteEducation(education.id),
      acceptLabel: 'Sim',
      rejectLabel: 'Não'
    })
  }

  private deleteProfessionalHistory(professionalHistoryId: number) {
    this.http.delete<any>(ApiUtil.getPath() + 'person/professional/history/delete/' + professionalHistoryId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'A exclusão foi feita com sucesso');
          this.getProfessionalHistory();
        }),
        catchError((httpErrorReponse) => {
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao excluir o histórico. Tente novamente.');
          return of();
        })
      ).subscribe();
  }

  private deleteEducation(educationId: number) {
    this.http.delete<any>(ApiUtil.getPath() + 'person/education/delete/' + educationId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'A exclusão foi feita com sucesso');
          this.getEducation();
        }),
        catchError((httpErrorReponse) => {
          this.alertMessageService.errorMessage('Erro', 'Ocorreu um erro ao excluir o histórico. Tente novamente.');
          return of();
        })
      ).subscribe();
  }

}
