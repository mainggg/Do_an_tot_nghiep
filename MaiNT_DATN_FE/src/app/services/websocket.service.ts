import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';
import { NotificationMessageService } from './notification-message.service';
import { environment } from '../../environment/environment.cloud';
import { TempNotificationService } from './tempNotification.service';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


@Injectable({
  providedIn: 'root',
})


export class WebsocketService {
  stompClient: any;

  WEBSOCKET_ENDPOINT = 'http://localhost:9090/AURA-notification'
  // constructor(
  //   private notificationService: NotificationMessageService,
  //   private tempService: TempNotificationService
  // ) {}

  // connect(): void {
  //   if(!localStorage.getItem('userName')) return;
  //   let userName = localStorage.getItem('userName')
  //   // console.log('webSocket Connection');
  //   const ws = new SockJS(this.WEBSOCKET_ENDPOINT);
    
  //   this.stompClient = Stomp.over(
  //     ws
  //   );
  //   this.stompClient.configure({
  //     reconnectDelay: 5000
  //   });
  //   this.stompClient.activate();
  //   const _this = this;
  //   _this.stompClient.connect(
  //     {},
  //     (frame: any) => {
  //       _this.stompClient.subscribe(
  //         `${this.WEBSOCKET_ENDPOINT}/topic/${userName}`,
  //         function (sdkEvent: any) {
  //           //_this.notificationService.notificationInfo(` Bạn có thông báo mới`);
  //           _this.onMessageReceived(sdkEvent);
  //         }
  //       );
  //       // this.stompClient.subscribe(
  //       //   WEBSOCKET_NOTIFY_TOPIC_ALL,
  //       //   function (sdkEvent: any) {
  //       //     _this.onMessageReceived(sdkEvent);
  //       //   }
  //       // );
  //     },
  //     this.errorCallBack
  //   );
  //   // console.log('webSocket Connection');
  // }

  // disconnect(): void {
  //   if (this.stompClient !== null) {
  //     this.stompClient.disconnect();
  //   }
  //   // console.log('Disconnected');
  // }

  // // on error, schedule a reconnection attempt
  // errorCallBack(error: string) {
  //   // console.log('errorCallBack -> ' + error);
  //   setTimeout(() => {
  //     this.connect();
  //   }, 5000);
  // }

  // onMessageReceived(message: any) {
  //   // console.log('Message Recieved from Server :: ' + message);
  //   // Emits the event.
  //   console.log(11)
  //   //this.tempService.notificationMessage.emit(JSON.parse(message?.body));
  // }
}
