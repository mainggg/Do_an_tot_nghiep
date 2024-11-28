import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationMessageService {
  constructor(private notificationService: ToastrService) {}

  notificationSuccess(message: string) {
    this.notificationService.success(`${message}`, ``, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationError(message: string) {
    this.notificationService.error(`${message}`, ``, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationWarning(message: string) {
    this.notificationService.warning(`${message}`, ``, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
  notificationInfo(message: string) {
    this.notificationService.info(`${message}`, ``, {
      timeOut: 2000,
      extendedTimeOut: 2000,
      tapToDismiss: true,
      progressBar: true,
      closeButton: true,
    });
  }
}
