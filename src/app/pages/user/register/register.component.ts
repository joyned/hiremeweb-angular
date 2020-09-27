import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessionalHistory } from 'src/app/classes/candidate/professional-history';
import { lorem } from 'src/app/classes/lorem';
import { Person } from 'src/app/classes/person/person';
import { PersonAddress } from 'src/app/classes/person/person-addres';
import { User } from 'src/app/classes/user/user';
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
  public isLoading = false;
  public pt: any;
  public tabIndex: number = 0;

  public image: any;
  private imageAsBase64: any;

  public terms = lorem;

  public dialogOpened = false;

  public professionalHistories: ProfessionalHistory[] = [];
  public professionalHistory: ProfessionalHistory;
  public selectedProfessionalHistory: ProfessionalHistory;
  private editingProfessionalHistory = false;

  public person: Person;

  public cols = [
    {
      name: 'company',
      label: 'Empresa'
    },
    {
      name: 'job',
      label: 'Cargo'
    },
    {
      name: 'description',
      label: 'Descrição'
    }
  ]

  constructor(private router: Router, private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.person = new Person();
    this.person.personAddress = new PersonAddress();
    this.person.user = new User();
    
    this.professionalHistory = new ProfessionalHistory();
    this.selectedProfessionalHistory = new ProfessionalHistory();
    this.buildCalendar();
  }

  async register() {
    console.log(this.person)
    this.isLoading = true;
    try {
      this.createLoadingDialog();
      await this.userService.registerNewUser(this.person);
      this.doLoginAfterRegister();
    } catch (error) {
      this.errorMessage = error.error;
      this.createErrorDialog();
    } finally {
      this.isLoading = false;
    }
  }

  async doLoginAfterRegister(){
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
      dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
      monthNamesShort: ["jan", "feb", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dec"],
      today: 'Hoje',
      clear: 'Apagar'
    }
  }

  nextTab() {
    this.tabIndex++;
  }

  previousTab() {
    this.tabIndex--;
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

  openDialog() {
    this.dialogOpened = true;
    this.professionalHistory = new ProfessionalHistory();
  }

  closeDialog() {
    this.dialogOpened = false;
    this.professionalHistory = new ProfessionalHistory();
  }

  addProfessionalHistory() {
    let pHistories = [...this.professionalHistories];
    if (!this.editingProfessionalHistory) {
      pHistories.push(this.professionalHistory);
    } else {
      pHistories[this.professionalHistories.indexOf(this.selectedProfessionalHistory)] = this.professionalHistory;
    }

    this.professionalHistories = pHistories;
    this.professionalHistory = new ProfessionalHistory();
    this.dialogOpened = false;
    this.editingProfessionalHistory = false;
  }

  onRowSelect(event) {
    this.editingProfessionalHistory = true;
    this.professionalHistory = event.data;
    this.dialogOpened = true;
  }

}
