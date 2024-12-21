import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.cloud';
@Injectable({
  providedIn: 'root',
})
export class TempNotificationService {
  url: string = environment.api_end_point;
  notificationMessage = new EventEmitter();
}
