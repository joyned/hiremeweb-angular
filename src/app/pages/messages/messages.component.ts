import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  public user = [
    'Josh',
    'Smith',
    'Caroline',
    'John'
  ]

  public currentChat = this.user[0];

  ngOnInit(): void {
  }

  changeChat(user){
    this.currentChat = user;
  }

}
