import { Component, OnInit } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { DatePipe } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-color-config',
  templateUrl: './color-config.component.html',
  styleUrls: ['./color-config.component.css'],
  providers: [DatePipe]
})
export class ColorConfigComponent implements OnInit {
  page: number = 1;
  perPage: number = 10;
  total: number = 5;
  dataItems: readonly any[] = [];
  filterColor: any = {};

  colums: any[] = [];
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  per_page: number = 10;

  listArrayNull: any[] = [];
  columns: any[] = [];

  isvisibleAddColor: boolean = false;
  isvisibleEditColor: boolean = false;
  selectedColorData: any = {};

  constructor(
    private configService: AdminService,
    private __notification: MessageService
  ) {}

  ngOnInit() {
    this.getListConfig();

    this.columns = [
      {
        keyName: 'color',
        keyTitle: 'Tên màu',
        visible: true,
        width: '200px',
      },
      {
        keyName: 'updatedAt',
        keyTitle: 'Ngày cập nhật',
        visible: true,
        width: '200px',
      },
    ];
  }

  async getListConfig() {
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        color: this.filterColor.color ? this.filterColor.color : '',
        updatedSearch: this.filterColor.updatedAt
          ? this.filterColor.updatedAt
          : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };

    let res = await this.configService.getListColor(dataRequest);
    //let res: any = '';
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
    this.isvisibleAddColor = true;
  }

  showAddPaymentMethodPopup(): void {
    this.isvisibleAddColor = true;
  }

  onAddPaymentMethodPopupVisibilityChange(isVisible: boolean): void {
    this.isvisibleAddColor = isVisible;
  }

  onAddPaymentMethod(): void {
    this.dataItems = [...this.dataItems];

    this.getListConfig();

    this.isvisibleAddColor = false;
  }

  onHandleEditPaymentMethod(paymentMethod: any) {
    this.selectedColorData = paymentMethod;
    this.isvisibleEditColor = true;
  }

  onEditPaymentMethodPopupVisibilityChange(isVisible: boolean): void {
    this.isvisibleEditColor = isVisible;
  }

  onUpdatePaymentMethod(): void {
    this.getListConfig();
    this.isvisibleEditColor = false;
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
      
      let res = await this.configService.deleteColor(this.configDelete.id);
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
    this.filterColor[keyName] = '';
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

    this.filterColor.updatedAt = formattedDates.join(' ');

    this.getListConfig();
  }
}
