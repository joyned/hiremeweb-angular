import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { Candidate } from 'src/app/classes/candidate/candidate';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private dialog: MatDialog, private candidateService: CandidateService, private messageService: AlertMessageService) { }

  public image: any;
  private imageAsBase64: any;
  public candidate: Candidate = new Candidate();
  public pt: any;

  async ngOnInit() {
    this.buildCalendar();
    this.candidate = await this.candidateService.getCandidateDetails();
  }

  async updateCandidateDetails() {
    try {
      await this.candidateService.updateCandidateDetails(this.candidate);
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
    console.log(btoa(binaryString));
  }

  sendEmail(dialog: any) {
    this.dialog.open(dialog);
    setTimeout(() => this.closeDialog(), 10000);
  }

  closeDialog() {
    this.dialog.closeAll();
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
