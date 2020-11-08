import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProfessionalHistory } from 'src/app/classes/candidate/professional-history';
import { PersonFileMetadata } from 'src/app/classes/user/PersonFileMetadata';
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
  public fileBase64: any;
  public personFileMetadata: PersonFileMetadata;

  public selectedFile = {
    fileName: '',
    fileBase64: undefined
  }

  constructor(private http: HttpClient, public datepipe: DatePipe, private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.professionalHistory = new ProfessionalHistory();
    this.getProfessionalHistory();
    this.buildCalendar();
    this.personFileMetadata = new PersonFileMetadata();
  }

  public getProfessionalHistory() {
    this.http.get<any>(ApiUtil.getPath() + 'person/professional/history', ApiUtil.buildOptions())
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

  public editProfessionalHistory(professionalHistory: ProfessionalHistory) {
    this.professionalHistory = Object.assign({}, professionalHistory);
    this.dialogOpened = true;
  }

  public closeDialog() {
    this.dialogOpened = false;
    this.professionalHistory = new ProfessionalHistory();
  }

  public saveProfessionalHistory() {
    this.http.post<any>(ApiUtil.getPath() + 'person/professional/history/update', this.professionalHistory, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.getProfessionalHistory();
          this.dialogOpened = false;
          this.alertMessageService.successMessage('Sucesso', 'Historico profissional foi atualizado com sucesso');
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

  public onBasicUpload(event) {
    let thisClazz = this
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      thisClazz.selectedFile.fileBase64 = reader.result;
      thisClazz.selectedFile.fileName = file.name;
    };
    reader.onerror = function (error) {
      thisClazz.alertMessageService.errorMessage('Erro', 'Falha ao fazer upload do arquivo');
    };
  }

  public removeFile() {
    this.selectedFile = {
      fileName: '',
      fileBase64: undefined
    };
  }

  public doUpload() {
    this.personFileMetadata.file = this.selectedFile.fileBase64;
    this.http.post<any>(ApiUtil.getPath(), this.personFileMetadata, ApiUtil.buildOptions());
  }

}
