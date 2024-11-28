import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-read-color',
  templateUrl: './read-color.component.html',
  styleUrls: ['./read-color.component.css'],
  providers: [DatePipe]

})
export class ReadColorComponent implements OnInit {
  constructor(
    private __notification: MessageService,
    private configService: AdminService,
    private datePipe: DatePipe
  ) {}

  @Input() isvisible: boolean = false;
  @Input() paymentMethodData: any = {};
  @Output() isvisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() submitData: EventEmitter<boolean> = new EventEmitter();
  @Output() update: EventEmitter<boolean> = new EventEmitter();
  checkAction: boolean = false;

  handleCancel() {
    if (this.checkAction) this.isvisibleCancel = true;
    else this.isvisibleChange.emit(false);
    this.update.emit(false);
  }

  isvisibleCancel: boolean = false;

  color: string = '';

  updatedAt: Date | null = null;
  formattedUpdatedAt: string = '';

  checkPaymentMethod: string = '';

  ngOnInit() {
    this.color = this.paymentMethodData.color || '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('paymentMethodData' in changes) {
      const method = this.paymentMethodData?.color || '';
      const dateUpdated = this.paymentMethodData?.updatedAt || '';
      this.color = method;
      this.updatedAt = dateUpdated;
      this.formatDate();
    }
  }

  formatDate() {
    if (this.updatedAt) {
      this.formattedUpdatedAt =
        this.datePipe.transform(this.paymentMethodData.updatedAt * 1000, 'dd/MM/yyyy') || '';
    }
  }

  checkValid() {
    if (this.color) {
      this.checkPaymentMethod = '';
    } else {
      this.checkPaymentMethod = 'Bạn chưa nhập màu';
    }
  }

  async submit() {
    if (!this.color) {
      this.__notification.notificationError('Bạn chưa nhập tên màu');
    } else if (this.checkPaymentMethod) {
      this.__notification.notificationError(this.checkPaymentMethod);
    } else {
      let request = {
        color: this.color,
      };

      let res = await this.configService.updateColor(
        request
      );
      //et res: any = '';

      if (res.result.ok) {
        this.__notification.notificationSuccess('Cập nhật màu thành công');
        this.update.emit(true);
      } else {
        this.__notification.notificationError('Cập nhật màu thất bại');
      }

      this.isvisibleChange.emit(false);
    }
  }
}
