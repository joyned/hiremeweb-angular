import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from 'src/app/classes/message/Message';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  private roomId: string;
  public messages: Message[];
  public message: Message;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private datePipe: DatePipe,
              private alertMessageService: AlertMessageService) { }

  ngOnInit(): void {
    this.roomId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.message = new Message();
    this.getMessages();
  }

  public sendMessage() {
    if(this.message.message){
      this.message.roomId = this.roomId;
      this.http.post<any>(ApiUtil.getPath() + 'message/candidate/send', this.message, ApiUtil.buildOptions())
        .pipe(
          tap((data: any) => {
            this.getMessages();
            this.message = new Message();
          }),
          catchError((httpErrorResponse) => {
            return of();
          })
        ).subscribe();
    } else {
      this.alertMessageService.errorMessage('Erro', 'O campo de mensagem está vazio.');
    }
  }

  private getMessages() {
    this.http.get<any>(ApiUtil.getPath() + 'message/candidate/' + this.roomId, ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.messages = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }


  public transformDate(date) {
    return this.datePipe.transform(new Date(date), 'dd/MM/yyyy HH:mm:ss');
  }

}
