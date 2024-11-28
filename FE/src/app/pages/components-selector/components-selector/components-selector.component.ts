import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { APPROVAL_STATUS } from '../../../utils/constrant';

@Component({
  selector: 'app-components-selector',
  templateUrl: './components-selector.component.html',
  styleUrl: './components-selector.component.css',
})
export class ComponentsSelectorComponent {
  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  ngOnInit(): void {}

  // TODO: selector app-button
  handleClickButton() {
    this._messageService.notificationSuccess(`Button active`);
  }

  // TODO: selector app-quick-action
  action: string = 'update';
  validAction: string = '';
  handleChangeAction(event: any) {
    if (event == 'update') {
      this.action = 'read';
      // AREA: xử lý các hành vi, có thể gọi lại API chi tiết, nếu cần
    } else if (event == 'read') {
      this.action = 'update';
      // AREA: xử lý các hành vi, có thể gọi lại API chi tiết, nếu cần
    } else {
      this._messageService.notificationWarning(this.validAction);
    }
  }

  // TODO: directive appNumberInput
  numberInput: string = '';

  // TODO: spin
  spin: boolean = false;

  // TODO: selector app-pagination
  page: number = 0;
  perPage: number = 10;
  total: number = 10;
  onHandlePagination(event: any) {}

  // TODO: selector select

  // TODO: selector hide column
  value: any = {};
  list: any[] = [
    {
      label: 'Vịt',
      id: 1,
    },
    {
      label: 'Gà',
      id: 2,
    },
    {
      label: 'Chó',
      id: 3,
    },
    {
      label: 'Mèo',
      id: 4,
    },
  ];
  refreshConfig(event: any) {
    if (event) {
      // Xử lý sự kiện khi đóng modal thêm mới
    }
  }
  changeSelectConfig(event: any) {
    // Xử lý sự kiện khi chọn lại dữ liệu
    // console.log(event);
  }

  // TODO: TABLE
  title: string = 'Danh sách...';
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  filter: any = {};
  lstData: any[] = [
    {
      stt: 1,
      name1: 'namenamenamenamenamenamenamenamenamenamename',
      name2: 'namenamenamenamenamenamenamenamenamenamename',
      name3: 'namenamenamenamenamenamenamenamenamenamename',
      name4: 'namenamenamenamenamenamenamenamenamenamename',
      name5: 'namenamenamenamenamenamenamenamenamenamename',
      name6: 'namenamenamenamenamenamenamenamenamenamename',
      status: 1,
    },
    {
      stt: 2,
      name1: 'name',
      name2: 'name',
      name3: 'name',
      name4: 'name',
      name5: 'name',
      name6: 'name',
      status: 2,
    },
    {
      stt: 3,
      name1: 'name',
      name2: 'name',
      name3: 'name',
      name4: 'name',
      name5: 'name',
      name6: 'name',
      status: 3,
    },
    {
      stt: 4,
      name1: 'name',
      name2: 'name',
      name3: 'name',
      name4: 'name',
      name5: 'name',
      name6: 'name',
      status: -2,
    },
    {
      stt: 5,
      name1: 'name',
      name2: 'name',
      name3: 'name',
      name4: 'name',
      name5: 'name',
      name6: 'name',
      status: -3,
    },
    {
      stt: 6,
      name1: 'name',
      name2: 'name',
      name3: 'name',
      name4: 'name',
      name5: 'name',
      name6: 'name',
      status: 1,
    },
  ];

  columns: any[] = [
    {
      title: 'column1',
      key: 'name1',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column2',
      key: 'name2',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column3',
      key: 'name3',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column4',
      key: 'name4',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column5',
      key: 'name5',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column6',
      key: 'name6',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column7',
      key: 'name7',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'column8',
      key: 'name8',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'status',
      key: 'status',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
  ];

  listStatus: any[] = [
    {
      label: 'message.draft',
      id: APPROVAL_STATUS.DRAFT,
    },
    {
      label: 'message.pending',
      id: APPROVAL_STATUS.PENDING,
    },
    {
      label: 'message.approved',
      id: APPROVAL_STATUS.APPROVED,
    },
    {
      label: 'message.rejected',
      id: APPROVAL_STATUS.REJECTED,
    },
    {
      label: 'message.canceled',
      id: APPROVAL_STATUS.CANCELED,
    },
  ];

  onHandleChangeColumn($event: any) {
    this.columns = [...$event];
    // localStorage.setItem('columnShipBunkering', JSON.stringify(this.columns));
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
  }

  handleFilterFollowStatus(status: any) {
    this.filter.status = status;
    if (this.filter.status) {
      // Gọi API
    }
  }

  onHandleFilter(event: any, column: any) {
    this.filter[column.key] = event;
    console.log(event);
  }

  onHandleClearFilter(column: any) {
    this.filter[column.key] = {
      value: null,
      operator: 0,
    };
    console.log(this.filter);
    // Gọi API
  }

  // TODO  selectors: app-modal-content
  visibleModal: boolean = false;
  openModalConfirm() {
    this.visibleModal = true;
  }

  handleConfirm() {
    alert('Click confirm');
  }

  // TODO: selector: app-breadscrumb
  breadcrumbs: any = [
    {
      name: 'Home',
      route: ``,
    },
    {
      name: 'Room',
      route: ``,
    },
    {
      name: 'Bed',
      route: ``,
    },
  ];
}
