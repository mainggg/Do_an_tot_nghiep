import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { TempNotificationService } from '../../services/tempNotification.service';
import { AdminService } from './admin.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private __translateSerice: TranslateService,
    private _router: Router,
    private _webSocket: WebsocketService,
    private _tempService: TempNotificationService,
    private _adminService: AdminService,
    private _messageService: MessageService,
    @Inject(DOCUMENT) private document: any
  ) {
    //this.connect()

  }

  isCollapsed: boolean = false;
  name?: any = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
  isvisibleChooseLanguage: boolean = false;
  urlImg: string = '';
  showNotification: boolean = false;
  countNotification: number = 9;
  isFullScreen: boolean = false;
  options: any[] = [
    { name: 'vi_VN', locale: vi_VN, srcImg: './assets/img/vie.png' },
    { name: 'en_US', locale: en_US, srcImg: './assets/img/eng.png' },
  ];

  listNotification: any = []

  visiableLogout = false;

  ngOnInit(): void {
    if(!localStorage.getItem('token')
      || !localStorage.getItem('roles')?.split(',').includes('atino_admin')  
    ){
      this._router.navigate(['./admin/login'])
    }
    let hasLanguage = localStorage.getItem('language');
    if (!hasLanguage) {
      this.urlImg = './assets/img/vie.png';
      this.__translateSerice.use('vi');
    } else {
      if (hasLanguage == 'en') {
        this.urlImg = './assets/img/eng.png';
        this.__translateSerice.use('en');
      } else {
        this.urlImg = './assets/img/vie.png';
        this.__translateSerice.use('vi');
      }

      
    }
    this.getListNotification();
      
    // this.getName();
  }

  // async getName() {
  //   await this.__keycloakService.loadUserProfile().then((item) => {
  //     let username = item.username ? item.username : '';
  //     this.name = `${username}`;
  //   });
  // }

  // Hàm xử lý chức năng thay đổi ngôn ngữ
  changeLanguage(language: any): void {
    this.isvisibleChooseLanguage = false;
    localStorage.setItem('language', language.locale.locale);
    this.urlImg = language.srcImg;
    this.__translateSerice.use(language.locale.locale);
  }

  hideNotification(event: any) {
    this.showNotification = event;
  }

  fullScreen() {
    let elem = document.documentElement;
    if (!this.isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        this.isFullScreen = true;
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
        this.isFullScreen = false;
      }
    }
  }

  openLogout(){
    this.visiableLogout = true;
  }

  confirmLogout(){
    this.visiableLogout = false;
    this.logout();
    this._router.navigate(['./admin/login'])
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('roles');
  }

  async getListNotification(){
    await this._adminService.getNotification().then((res) => {
      if(res.result.responseCode == '00'){
        this.listNotification = res.data
      }
    })
  }

  // connect(): void {
  //   this._webSocket.connect();
  //   this._tempService.notificationMessage.subscribe((data) => {
  //     this.getListNotification().then(() => {
  //       this._messageService.notificationInfo(`Bạn có thông báo mới`);
  //     });
     
      
      
  //   });
  // }

  // disconnect(): void {
  //   this._webSocket.disconnect();
  // }

  
}
