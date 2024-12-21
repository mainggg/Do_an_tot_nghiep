import { Component } from '@angular/core';
import moment from 'moment';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  constructor(
    private _categoryService: AdminService,
    private _messageService: MessageService
  ) {}
  title: string = 'Danh sách tài khoản';
  spin: boolean = false;
  page: number = 1;
  perPage: number = 10;
  total: number = 5;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';

  filter: any = {
    updatedAtSearch: [],
    categoryName: '',
  };
  lstData: any[] = [];
  visibleModal: boolean = false;
  action: string = '';
  titleModal: string = '';
  dataInformation: any = {
    categoryName: null,
  };
  lstRoles: any[] = [
    {
      value: 1,
      label: 'Admin'
    },
    {
      value: 2,
      label: 'User'
    }
  ]

  ngOnInit() {
    this.getLstData();
  }

  async getLstData() {
    this.spin = true;
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        userName: this.filter.userName,
        address: this.filter.address,
        email: this.filter.email,
        phoneNumber: this.filter.phoneNumber,
        firstName: this.filter.firstName,
        lastName: this.filter.lastName,
        updatedAtSearch:
          this.filter.updatedAtSearch.length > 0
            ? [
                moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD') + 'T00:00:00.000Z',
              ]
            : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._categoryService
        .getAllCustomer(dataRequest)
        .then((item: any) => {
          if (item.result.responseCode == '00') {
            this.lstData = item.data.map((item: any, index: number) => ({
              ...item,
              stt: (this.page - 1) * this.perPage + index + 1,
            }));
            this.total = item.dataCount;
          }
          this.spin = false;
        });
    } catch (error) {
      this.spin = false;
    }
  }

  onHandleChangeColumn($event: any) {
    this.columns = [...$event];
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
    this.getLstData();
  }

  onHandleFilter($event: any) {
    if ($event.keyCode == 13 || $event.type == 'click') {
      //  Gọi API
      
    }
    this.getLstData();
  }

  onHandleClearFilter(key: any) {
    this.filter[key] = '';
    // Gọi API
    this.getLstData();
  }

  onHandlePagination(event: any) {
    this.page = event.page;
    this.perPage = event.size;
    this.getLstData();
  }

  handleCreate() {
    this.action = 'create';
    this.visibleModal = true;
    this.titleModal = 'Thêm mới tài khoản';
    this.dataInformation.categoryName = '';
    (this.dataInformation.createdBy = 'admin'),
      (this.dataInformation.updatedBy = 'admin');
  }

  handleUpdate(row: any) {
    this.action = 'update';
    this.visibleModal = true;
    this.titleModal = 'Cập nhật tài khoản';
    this.dataInformation = {
      id: row.id,
      categoryName: row.categoryName,
      updatedAt: row.updatedAt,
    };
  }

  handleRead(row: any) {
    this.action = 'read';
    this.visibleModal = true;
    this.titleModal = 'Xem chi tiết tài khoản';
    this.dataInformation = {
      ...row,
    };
  }

  visibleModalDelete: boolean = false;
  handleDelete(row: any) {
    this.visibleModalDelete = true;
    this.dataInformation = {
      id: row.id,
      categoryName: row.categoryName,
      updatedAt: row.updatedAt,
    };
  }

  handleConfirmDelete() {
    // Xử lý xóa  (Khi gọi API thành công set dataInformation = {})
    this.deleteCategoryParent();
  }

  onHandleCancel() {
    this.visibleModal = false;
    this.action = '';
    this.titleModal = '';
    this.dataInformation = {};
  }

  handleConfirm() {
    if (!this.dataInformation.categoryName.trim()) {
      this._messageService.notificationWarning(
        `Bạn cần nhập đủ thông tin yêu cầu`
      );
      return;
    } else {
      if (this.action == 'create') {
        /// Xử lý thêm mới (Khi gọi API thành công set dataInformation = {})
        this.createCategoryParent();
      }
      if (this.action == 'update') {
        /// Xử lý cập nhật (Khi gọi API thành công set dataInformation = {})
        this.updateCategoryParent();
      }
    }
  }

  async createCategoryParent() {
    this.spin = true;
    try {
      await this._categoryService
        .saveCategory(this.dataInformation)
        .then((item: any) => {
          if (item.result.responseCode == '00') {
            this._messageService.notificationSuccess(item.result.message);
            this.getLstData();
          } else {
            this._messageService.notificationError(item.result.message);
          }
          this.visibleModal = false;
          this.spin = false;
          this.dataInformation = {};
        });
    } catch (error) {
      this.visibleModal = false;
      this.spin = false;
    }
  }

  async updateCategoryParent() {
    this.spin = true;
    try {
      await this._categoryService
        .updateCategory(this.dataInformation.id, this.dataInformation)
        .then((item: any) => {
          if (item.result.responseCode == '00') {
            this._messageService.notificationSuccess(item.result.message);
            this.getLstData();
          } else {
            this._messageService.notificationError(item.result.message);
          }
          this.visibleModal = false;
          this.spin = false;
          this.dataInformation = {};
        });
    } catch (error) {
      this.visibleModal = false;
      this.spin = false;
    }
  }

  async deleteCategoryParent() {
    this.spin = true;
    try {
      await this._categoryService
        .deleteCategory(this.dataInformation.id)
        .then((item: any) => {
          if (item.result.responseCode == '00') {
            this._messageService.notificationSuccess(item.result.message);
            this.getLstData();
          } else {
            this._messageService.notificationError(item.result.message);
          }
          this.visibleModalDelete = false;
          this.spin = false;
          this.dataInformation = {};
        });
    } catch (error) {
      this.visibleModalDelete = false;
      this.spin = false;
    }
  }

  columns: any[] = [
    {
      title: 'Tên tài khoản',
      key: 'userName',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Họ',
      key: 'firstName',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Tên',
      key: 'lastName',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Email',
      key: 'email',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Số điện thoại',
      key: 'phoneNumber',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ngày cập nhật',
      key: 'updatedAt',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
  ];

}
