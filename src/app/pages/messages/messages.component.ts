import { Component, OnInit } from '@angular/core';
import { ClientSocket } from 'src/app/services/socket/client.socket';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public socket: ClientSocket) {
    this.socket.recieveMessage()
      .subscribe(m => {
        this.messages.push(m);
      });
  }

  public messages = [];

  public user = [
    'Josh',
    'Smith',
    'Caroline',
    'John'
  ];

  public message;
  public currentChat = this.user[0];

  ngOnInit(): void {
  }

  changeChat(user) {
    this.socket.createRoom(user);
    this.currentChat = user;
  }

  async sendMessage() {
    const data = {
      message: this.message,
      room: this.currentChat
    };
    this.socket.sendMessage(data);
  }
}
