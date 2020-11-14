import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from 'src/app/classes/message/Message';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  public text: string;
  public messages: Message[];
  public message: Message;
  public roomId: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe,
              private alertMessageService: AlertMessageService) {
  }

  ngOnInit(): void {
    this.message = new Message();
    this.message.toId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getMessages();
  }

  private getMessages() {
    this.http.get<any>(ApiUtil.getPath() + 'messages/get/' + this.message.toId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.messages = data.payload.messages;
          this.roomId = data.payload.roomId;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }


  public sendMessage() {
    if(this.message.message){
      this.message.roomId = this.roomId;
      this.http.post<any>(ApiUtil.getPath() + 'messages/send', this.message, ApiUtil.buildOptions())
        .pipe(
          tap((data: any) => {
            this.getMessages();
          }),
          catchError((httpErrorResponse) => {
            return of();
          })
        ).subscribe();
    } else {
      this.alertMessageService.errorMessage('Erro', 'O campo de mensagem está vazio.');
    }
  }

  public transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }

}
