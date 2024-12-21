import { Component, Inject } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { NzI18nService, en_US, vi_VN } from 'ng-zorro-antd/i18n';
// import { DOCUMENT } from '@angular/common';
// import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // constructor(
  //   private __translateSerice: TranslateService,
  //   @Inject(DOCUMENT) private document: any
  // ) {}

  // isCollapsed: boolean = false;
  // name?: string = 'Xuân Tình';
  // isvisibleChooseLanguage: boolean = false;
  // urlImg: string = '';
  // showNotification: boolean = false;
  // countNotification: number = 9;
  // isFullScreen: boolean = false;
  // options: any[] = [
  //   { name: 'vi_VN', locale: vi_VN, srcImg: './assets/img/vie.png' },
  //   { name: 'en_US', locale: en_US, srcImg: './assets/img/eng.png' },
  // ];

  // ngOnInit(): void {
  //   let hasLanguage = localStorage.getItem('language');
  //   if (!hasLanguage) {
  //     this.urlImg = './assets/img/vie.png';
  //     this.__translateSerice.use('vi');
  //   } else {
  //     if (hasLanguage == 'en') {
  //       this.urlImg = './assets/img/eng.png';
  //       this.__translateSerice.use('en');
  //     } else {
  //       this.urlImg = './assets/img/vie.png';
  //       this.__translateSerice.use('vi');
  //     }
  //   }
  //   // this.getName();
  // }

  // // async getName() {
  // //   await this.__keycloakService.loadUserProfile().then((item) => {
  // //     let username = item.username ? item.username : '';
  // //     this.name = `${username}`;
  // //   });
  // // }

  // // Hàm xử lý chức năng thay đổi ngôn ngữ
  // changeLanguage(language: any): void {
  //   this.isvisibleChooseLanguage = false;
  //   localStorage.setItem('language', language.locale.locale);
  //   this.urlImg = language.srcImg;
  //   this.__translateSerice.use(language.locale.locale);
  // }

  // hideNotification(event: any) {
  //   this.showNotification = event;
  // }

  // fullScreen() {
  //   let elem = document.documentElement;
  //   if (!this.isFullScreen) {
  //     if (elem.requestFullscreen) {
  //       elem.requestFullscreen();
  //       this.isFullScreen = true;
  //     }
  //   } else {
  //     if (this.document.exitFullscreen) {
  //       this.document.exitFullscreen();
  //       this.isFullScreen = false;
  //     }
  //   }
  // }

  // logout() {}
}
