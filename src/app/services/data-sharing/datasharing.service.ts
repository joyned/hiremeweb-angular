import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  public userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public pages: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);

  constructor() { }
}
