import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class ClientSocket {

    private socket = io('https://hire-me-socket.herokuapp.com/');

    sendMessage(data){
        this.socket.emit('send message', data);
    }

    recieveMessage(){
        let observable = new Observable<any>(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        })
        return observable;
    }

    createRoom(user){
        this.socket.emit('join', {user: user})
    }

}