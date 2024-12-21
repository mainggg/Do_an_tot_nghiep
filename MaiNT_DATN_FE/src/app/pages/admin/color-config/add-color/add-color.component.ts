import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css'],
  providers: [DatePipe]

})
export class AddColorComponent implements OnInit {
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

  color: string = '';

  checkMethod: string = '';

  checkValid() {
    if (this.color) {
      this.checkMethod = '';
    } else {
      this.checkMethod = 'Bạn chưa nhập tên màu';
    }
  }

  async submit() {
    if (!this.color) {
      this.__notification.notificationError('Bạn chưa nhập màu');
    } else if (this.checkMethod) {
      this.__notification.notificationError(this.checkMethod);
    } else {
      let request = {
        color: this.color,
        createdBy: localStorage.getItem('userName'),
        updatedBy: localStorage.getItem('userName'),
      };

      let res = await this.configService.saveColor(request);
      //let res: any = '';
      if (res.result.responseCode == '00') {
        this.__notification.notificationSuccess('Thêm màu thành công');
        this.add.emit(true);
        (this.color = ''), (this.checkMethod = '');
      } else {
        this.__notification.notificationError('Thêm màu thất bại');
      }

      this.isvisibleChange.emit(false);
    }
  }
}
