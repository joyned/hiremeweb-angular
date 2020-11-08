import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Person } from 'src/app/classes/person/person';
import { PersonAddress } from 'src/app/classes/person/person-addres';
import { User } from 'src/app/classes/user/user';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { PersonService } from 'src/app/services/person/person.service';
import { HttpClient } from '@angular/common/http';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit {

  constructor(private messageService: AlertMessageService, private router: Router,
    private sanitizer: DomSanitizer, private http: HttpClient, private dialogService: DialogService) { }

  public image: any;
  public person: Person;
  public pt: any;
  public loading: boolean;

  private imageAsBase64: any;

  ngOnInit() {
    this.buildCalendar();
    this.person = new Person();
    this.person.user = new User();
    this.person.personAddress = new PersonAddress();

    this.getPersonDetails();
  }

  private getPersonDetails() {
    this.loading = true;
    this.http.get<any>(ApiUtil.getPath() + 'person/get', ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.person.birthdate = new Date();
          this.person = data.payload;
          this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.person.photo) as any)
            .changingThisBreaksApplicationSecurity;
          this.loading = false;
        }),
        catchError((httpResponse) => {
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public updatePersonDetails() {
    this.loading = true;
    this.http.post<any>(ApiUtil.getPath() + 'person/update', this.person, ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.messageService.successMessage('Sucesso', 'Sua conta foi atualizada com sucesso!');
          this.loading = false;
        }),
        catchError((httpResponse) => {
          this.messageService.errorMessage('Erro', 'Não foi possivel atualizar sua conta. Por favor, tente novamente.');
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  public setImage(event) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

  private _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imageAsBase64 = btoa(binaryString);
    this.person.photo = this.imageAsBase64;
  }

  public sendEmail(dialog: any) {
    setTimeout(() => this.closeDialog(), 10000);
  }

  private closeDialog() {
  }

  private buildCalendar() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro',
        'outubro', 'novembro', 'dezembro'],
      monthNamesShort: ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'],
      today: 'Hoje',
      clear: 'Apagar'
    };
  }

  public changePassword() {
    this.dialogService.open(ChangePasswordComponent, {
      header: 'Mudar senha'
    });
  }

  public goToMyProfessionalHistory(){
    this.router.navigateByUrl('/user/my-resume');
  }

}
