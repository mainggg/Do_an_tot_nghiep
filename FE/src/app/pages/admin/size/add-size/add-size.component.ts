import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../../../../services/message.service';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.css'],
  providers: [DatePipe]

})
export class AddSizeComponent implements OnInit {
  constructor(
    private __notification: MessageService,
     private configService: AdminService
  ) {}

  @Input() isvisible: boolean = false;
  @Input() entryType: number = 0;
  @Output() isvisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() submitData: EventEmitter<boolean> = new EventEmitter();
  @Output() add: EventEmitter<boolean> = new EventEmitter();

  checkAction: boolean = false;

  ngOnInit() {}

  handleCancel() {
    if (this.checkAction) this.isvisibleCancel = true;
    else this.isvisibleChange.emit(false);
    this.add.emit(false);
  }

  cancelConfirm() {
    this.isvisibleChange.emit(false);
    this.add.emit(false);
  }

  isvisibleCancel: boolean = false;

  sizeName: string = '';

  checkMethod: string = '';

  checkValid() {
    if (this.sizeName) {
      this.checkMethod = '';
    } else {
      this.checkMethod = 'Bạn chưa nhập size';
    }
  }

  async submit() {
    if (!this.sizeName) {
      this.__notification.notificationError('Bạn chưa nhập size');
    } else if (this.checkMethod) {
      this.__notification.notificationError(this.checkMethod);
    } else {
      let request = {
        sizeName: this.sizeName,
        createdBy: localStorage.getItem('userName'),
        updatedBy: localStorage.getItem('userName')
      };

      let res = await this.configService.saveSize(request);
      //let res: any = '';
      if (res.result.responseCode == '00') {
        this.__notification.notificationSuccess('Thêm size thành công');
        this.add.emit(true);
        (this.sizeName = ''), (this.checkMethod = '');
      } else {
        this.__notification.notificationError('Thêm size thất bại');
      }

      this.isvisibleChange.emit(false);
    }
  }
}
