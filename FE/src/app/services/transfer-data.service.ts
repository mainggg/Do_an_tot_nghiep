import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  data: any;
  isCollapsed: boolean = false;
  isCollapsedSubject: any = new Subject<any>();
  constructor() {}
  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setIsCollapsed(data: any) {
    this.isCollapsed = data;
    this.isCollapsedSubject.next(data);
  }

  getIsCollapsed() {
    return this.isCollapsed;
  }
  getIsCollapsedObservable() {
    return this.isCollapsedSubject.asObservable();
  }
}
