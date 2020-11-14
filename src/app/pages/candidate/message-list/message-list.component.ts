import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from 'primeng/messages';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiUtil } from 'src/app/classes/utils/APIUtils/api-util';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  public messages: Messages[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.listMessages();
  }

  private listMessages(){
    this.http.get<any>(ApiUtil.getPath() + 'message/candidate/list', ApiUtil.buildOptions())
      .pipe(
        tap((data: any) => {
          this.messages = data.payload;
        }),
        catchError((httpErrorResponse) => {
          return of();
        })
      ).subscribe();
  }

  public viewMessages(roomId: string){
    this.router.navigate(['candidate/message', {id: roomId}])
  }

}
