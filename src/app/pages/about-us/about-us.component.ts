import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {

  constructor(private http: HttpClient, private alertMessageService: AlertMessageService) { }

  public options: SelectItem[] = [
    {
      label: 'Empresa',
      value: 'Empresa'
    },
    {
      label: 'Candidato',
      value: 'Empresa'
    }
  ];

  public contact = {
    email: '',
    name: '',
    position: 'Empresa',
    message: ''
  }

  public infos = [
    {
      title: 'Oportunidade',
      text: `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
      `
    },
    {
      title: 'Rapidez',
      text: `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostru dolor sit amet, consectetur adipn.
      `
    }
  ];

  ngOnInit(): void {
  }

  public scrollToElement($element): void {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  public sendContactEmail() {
    if (this.validateFields()) {
      this.http.post(ApiUtil.getPath() + 'contact', this.contact, {})
        .pipe(
          tap((data: any) => {
            this.alertMessageService.successMessage('Sucesso', 'Seu contato foi enviado para nosso time. Fique de olho no seu email :).');
          }),
          catchError((httpErrorResponse) => {
            return of()
          })
        ).subscribe();
    } else {
      this.alertMessageService.errorMessage('Erro', 'É necessário preencher o nome, email e mensagem para enviar um contato');
    }
  }

  private validateFields() {
    return this.contact.name && this.contact.email && this.contact.message
  }

}
