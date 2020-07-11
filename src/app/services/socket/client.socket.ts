import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ClientSocket {

    private socket = io('https://hire-me-socket.herokuapp.com/');

    sendMessage(data) {
        this.socket.emit('send message', data);
    }

    recieveMessage() {
        const observable = new Observable<any>(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }

    createRoom(userToChat) {
        this.socket.emit('join', { user: userToChat });
    }

}
