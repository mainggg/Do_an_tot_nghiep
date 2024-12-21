import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { DatePipe } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css'],
  providers: [DatePipe]

})
export class SizeComponent implements OnInit {
  page: number = 1;
  perPage: number = 10;
  total: number = 5;
  dataItems: readonly any[] = [];
  filterSize: any = {};

  colums: any[] = [];
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  per_page: number = 10;

  listArrayNull: any[] = [];
  columns: any[] = [];

  isvisibleAddSize: boolean = false;
  isvisibleEditSize: boolean = false;
  selectedSizeData: any = {};

  constructor(
    // private configService: ConfigServiceService,
    private __notification: MessageService,
    private _sizeService: AdminService
  ) {}

  ngOnInit() {
    this.getListConfig();

    this.columns = [
      {
        keyName: 'sizeName',
        keyTitle: 'Size',
        check: true,
        width: '200px',
      },
      {
        keyName: 'updatedAt',
        keyTitle: 'Ngày cập nhật',
        check: true,
        width: '200px',
      },
    ];
  }

  async getListConfig() {
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        code: this.filterSize.code ? this.filterSize.code : '',
        updatedSearch: this.filterSize.updatedAt
          ? this.filterSize.updatedAt
          : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };

    let res = await this._sizeService.getListSize(dataRequest);
 
    if (res) {
      if (res.result.responseCode == '00') {
        this.total = res.dataCount;
        this.dataItems = res.data;
      } else {
        this.__notification.notificationError(` ${res.result.message}`);
      }
    } else {
      this.__notification.notificationError(
        ` Có lỗi xảy ra, vui lòng thử lại sau`
      );
    }
  }

  onHandleAddNew() {
    this.isvisibleAddSize = true;
  }

  showAddPaymentMethodPopup(): void {
    this.isvisibleAddSize = true;
  }

  onAddPaymentMethodPopupVisibilityChange(isVisible: boolean): void {
    this.isvisibleAddSize = isVisible;
  }

  onAddPaymentMethod(): void {
    this.dataItems = [...this.dataItems];

    this.getListConfig();

    this.isvisibleAddSize = false;
  }

  onHandleEditPaymentMethod(paymentMethod: any) {
    this.selectedSizeData = paymentMethod;
    this.isvisibleEditSize = true;
  }

  onEditPaymentMethodPopupVisibilityChange(isVisible: boolean): void {
    this.isvisibleEditSize = isVisible;
  }

  onUpdatePaymentMethod(): void {
    this.getListConfig();
    this.isvisibleEditSize = false;
  }

  isShowModalDelete: boolean = false;
  configDelete: any = {};

  onHandleDeletePaymentMethod(config: any) {
    this.configDelete = config;

    this.isShowModalDelete = true;
  }

  onHandleCancelDelete($event: any) {
    this.isShowModalDelete = $event;
  }

  async onHandleConfirmDelete($event: any) {
    if ($event == true) {
      let res = await this._sizeService.deleteSize(this.configDelete.id);
      if (res) {
        if (res.result.responseCode == '00') {
          this.__notification.notificationSuccess(
            ` Xóa cấu hình ${
              this.configDelete.code ? this.configDelete.code : ''
            } thành công`
          );
          this.getListConfig();
        } else {
          this.__notification.notificationError(` ${res.result.message}`);
        }
      } else {
        this.__notification.notificationError(
          ` Có lỗi xảy ra, vui lòng thử lại sau`
        );
      }
    }
  }

  onHandlePagination(event: any) {
    this.page = event.page;
    this.perPage = event.size;
    this.getListConfig();
  }

  onHandleFilter($event: any) {
    if ($event.keyCode == 13) {
      this.getListConfig();
    } else if ($event.type == 'click') {
      this.getListConfig();
    }
  }

  onHandleStatus() {
    this.getListConfig();
  }

  onHandleClear(keyName: any) {
    this.filterSize[keyName] = '';
    this.getListConfig();
  }

  id = -1;
  onResize({ width }: NzResizeEvent, i: number): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.columns[i].width = width + 'px';
    });
  }

  handleSort(column: any, event: any) {
    this.columns.forEach((element) => {
      element.sortOrder = '';
    });
    column.sortOrder = event;
    this.sortOrder = event;
    this.sortProperty = column.key;
    this.getListConfig();
  }

  onHandleChangeColumn($event: any) {
    this.columns = [...$event];
  }

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.dataItems.forEach((item) => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly any[]): void {
    this.dataItems = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.dataItems.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.dataItems.some((item) => this.setOfCheckedId.has(item.id)) &&
      !this.checked;
  }

  onChange(result: Date[]): void {
    const formattedDates = result.map((dateString: Date) => {
      const isoDateString = dateString.toISOString();
      return isoDateString;
    });

    this.filterSize.updatedAt = formattedDates.join(' ');

    this.getListConfig();
  }
}
