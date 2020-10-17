import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class AlertMessageService {

  constructor() { }

  private loaderSubject = new Subject<MessageState>();
  loaderState = this.loaderSubject.asObservable();

  public infoMessage(message: string, detail: string) {
    this.message('info', message, detail);
  }

  public errorMessage(message: string, detail: string) {
    this.message('error', message, detail);
  }

  public successMessage(message: string, detail: string) {
    this.message('success', message, detail);
  }

  private message(severityMessage: string, messageText: string, detailText: string) {
    this.loaderSubject.next({
      severity: severityMessage,
      message: messageText,
      detail: detailText
    } as MessageState);
  }

}

export interface MessageState {
  severity: string;
  message: string;
  detail: string;
}
