import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, subscribeOn, tap } from 'rxjs/operators';
import { ProfessionalHistory } from 'src/app/classes/candidate/professional-history';
import { Person } from 'src/app/classes/person/person';
import { PersonAddress } from 'src/app/classes/person/person-addres';
import { User } from 'src/app/classes/user/user';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  @ViewChild('error') errorDialog: TemplateRef<any>;
  @ViewChild('loading') loadingDialog: TemplateRef<any>;

  public errorMessage: any;
  public emptyFields = '';
  public loading = false;
  public pt: any;
  public tabIndex = 0;

  public image: any;
  private imageAsBase64: any;

  public dialogOpened = false;

  public professionalHistories: ProfessionalHistory[] = [];
  public professionalHistory: ProfessionalHistory;
  public selectedProfessionalHistory: ProfessionalHistory;

  public person: Person;

  constructor(private router: Router, private loginService: LoginService,
    private http: HttpClient, private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.person.personAddress = new PersonAddress();
    this.person.user = new User();
    this.professionalHistory = new ProfessionalHistory();
    this.selectedProfessionalHistory = new ProfessionalHistory();
    this.buildCalendar();
  }

  public register() {
    this.loading = true;
    this.person.professionalHistory = this.professionalHistories;
    this.http.post<any>(ApiUtil.getPath() + 'register', this.person, {})
      .pipe(
        tap((data: any) => {
          this.alertMessageService.successMessage('Sucesso', 'Você foi registrado com sucesso no nosso sistema');
          this.router.navigateByUrl('/login');
          this.loading = false;
        }),
        catchError((httpErrorResponse) => {
          if (httpErrorResponse.error.payload === 'user.already.exists') {
            this.alertMessageService.errorMessage('Erro', 'Esse email já está cadastrado no nosso sistema');
          }
          this.loading = false;
          return of();
        })
      ).subscribe();
  }

  async doLoginAfterRegister() {
    const user = new User();
    user.email = this.person.user.email;
    user.password = this.person.user.password;
    await this.loginService.login(user);
    this.router.navigateByUrl('/');
  }

  createErrorDialog() {
  }

  createLoadingDialog() {
  }

  buildCalendar() {
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

  nextTab() {
    this.tabIndex++;
  }

  previousTab() {
    this.tabIndex--;
  }

  setImage(event) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imageAsBase64 = btoa(binaryString);
    this.person.photo = this.imageAsBase64;
  }

  openDialog() {
    this.dialogOpened = true;
    this.professionalHistory = new ProfessionalHistory();
  }

  closeDialog() {
    this.dialogOpened = false;
    this.professionalHistory = new ProfessionalHistory();
  }

  addProfessionalHistory() {
    const index = this.professionalHistories.indexOf(this.professionalHistory, 0);
    if (index > -1) {
      this.professionalHistories.splice(index, 1);
    }

    if (this.professionalHistory.currentJob) {
      this.professionalHistory.finalDate = undefined;
    }

    this.professionalHistories.push(this.professionalHistory);
    this.professionalHistory = new ProfessionalHistory();
    this.dialogOpened = false;
  }

  public editProfessionalHistory(professionalHistory: ProfessionalHistory) {
    this.professionalHistory = professionalHistory;
    this.dialogOpened = true;
  }

}
