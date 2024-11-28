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
  selector: 'app-read-size',
  templateUrl: './read-size.component.html',
  styleUrls: ['./read-size.component.css'],
  providers: [DatePipe]

})
export class ReadSizeComponent implements OnInit {
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

  sizeName: string = '';

  updatedAt: Date | null = null;
  formattedUpdatedAt: string = '';

  checkPaymentMethod: string = '';

  ngOnInit() {
    this.sizeName = this.paymentMethodData.sizeName || '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('paymentMethodData' in changes) {
      const method = this.paymentMethodData?.sizeName || '';
      const dateUpdated = this.paymentMethodData?.updatedAt || '';
      this.sizeName = method;
      this.updatedAt = dateUpdated;
      this.formatDate();
    }
  }

  formatDate() {
    if (this.updatedAt) {
      this.formattedUpdatedAt =
        this.datePipe.transform( this.paymentMethodData?.updatedAt * 1000, 'dd/MM/yyyy') || '';
    }
  }

  checkValid() {
    if (this.sizeName) {
      this.checkPaymentMethod = '';
    } else {
      this.checkPaymentMethod = 'Bạn chưa nhập size';
    }
  }

  async submit() {
    if (!this.sizeName) {
      this.__notification.notificationError('Bạn chưa nhập size');
    } else if (this.checkPaymentMethod) {
      this.__notification.notificationError(this.checkPaymentMethod);
    } else {
      let request = {
        id: this.paymentMethodData.id,
        sizeName: this.sizeName,
        updatedBy: localStorage.getItem('userName')
      };

      let res = await this.configService.updateSize(
        request
      );
  

      if (res.result.ok) {
        this.__notification.notificationSuccess('Cập nhật size thành công');
        this.update.emit(true);
      } else {
        this.__notification.notificationError('Cập nhật size thất bại');
      }

      this.isvisibleChange.emit(false);
    }
  }
}
