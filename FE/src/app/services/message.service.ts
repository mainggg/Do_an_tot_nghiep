import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private _notificationService: ToastrService,
    private _translateService: TranslateService
  ) {
    this._translateService
      .get('Thông báo')
      .subscribe((item) => (this.notification = item));
  }
  notification: string = '';
  notificationSuccess(message: string) {
    this._notificationService.success(`${message}`, this.notification, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationError(message: string) {
    this._notificationService.error(`${message}`, this.notification, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationWarning(message: string) {
    this._notificationService.warning(`${message}`, this.notification, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationInfo(message: string) {
    this._notificationService.info(`${message}`, this.notification, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
}
