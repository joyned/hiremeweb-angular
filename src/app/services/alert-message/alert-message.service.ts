import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class AlertMessageService {

  constructor() { }

  private loaderSubject = new Subject<MessageState>();
  loaderState = this.loaderSubject.asObservable();

  infoMessage(message: string, detail: string) {
    this.message('info', message, detail);
  }

  errorMessage(message: string, detail: string) {
    this.message('error', message, detail);
  }

  successMessage(message: string, detail: string) {
    this.message('success', message, detail);
  }

  message(severity: string, message: string, detail: string) {
    this.loaderSubject.next(<MessageState>{
      severity: severity,
      message: message,
      detail: detail
    });
  }

}

export interface MessageState {
  severity: string;
  message: string;
  detail: string;
}