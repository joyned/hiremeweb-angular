import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private personService: PersonService, private messageService: AlertMessageService, private sanitizer: DomSanitizer, private http: HttpClient) { }

  public image: any;
  private imageAsBase64: any;
  public person: Person;
  public pt: any;

  async ngOnInit() {
    this.buildCalendar();
    this.person = new Person();
    this.person.user = new User();
    this.person.personAddress = new PersonAddress();

    this.getPersonDetails();
    // this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.person.photo) as any).changingThisBreaksApplicationSecurity;
  }

  private getPersonDetails() {
    this.http.get<any>(ApiUtil.getPath() + 'person/get', ApiUtil.buildOptions())
      .pipe(
        tap((data) => {
          this.person.birthdate = new Date(data.payload.birthdate);
          this.person = data.payload;
        }),
        catchError((httpResponse) => {
          return of();
        })
      ).subscribe();
  }

  async updatePersonDetails() {
    try {
      await this.personService.updatePersonDetails(this.person);
      this.messageService.successMessage("Sucesso", "Sua conta foi atualizada com sucesso!");
    } catch (error) {
      this.messageService.errorMessage("Erro", "Não foi possivel atualizar sua conta. Por favor, tente novamente.");
    }
  }

  setImage(event) {
    this.image = event.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.imageAsBase64 = btoa(binaryString);
    this.person.photo = this.imageAsBase64;
  }

  sendEmail(dialog: any) {
    setTimeout(() => this.closeDialog(), 10000);
  }

  closeDialog() {
  }

  buildCalendar() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
      monthNamesShort: ["jan", "feb", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dec"],
      today: 'Hoje',
      clear: 'Apagar'
    }
  }

}
