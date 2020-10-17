import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AlertMessageService, MessageState } from 'src/app/services/alert-message/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
  providers: [MessageService]
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private alertMessageService: AlertMessageService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.alertMessageService.loaderState.subscribe((state: MessageState) => {
      this.messageService.add({ key: 'tc', severity: state.severity, summary: state.message, detail: state.detail, });
    });

    setTimeout(() => {
      this.messageService.clear();
    }, 10000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
