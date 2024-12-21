import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MessageService } from '../../../services/message.service';
import moment from 'moment';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'app-category-children',
  templateUrl: './category-children.component.html',
  styleUrl: './category-children.component.css',
})
export class CategoryChildrenComponent {
  constructor(
    private _categoryService: AdminService,
    private _messageService: MessageService
  ) {}
  title: string = 'Danh sách danh mục sản phẩm con';
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
  lstData: any[] = [
    // {
    //   stt: 1,
    //   categoryName: 'Áo 2',
    //   updatedAt: new Date(),
    //   categoryParent: {
    //     id: 1,
    //     categoryName: 'Áo',
    //   },
    //   parentId: 1,
    // },
    // {
    //   stt: 2,
    //   categoryName: 'Quần 2',
    //   updatedAt: new Date(),
    //   categoryParent: {
    //     id: 2,
    //     categoryName: 'Quần',
    //   },
    //   parentId: 2,
    // },
  ];
  lstCategoryParent: any[] = [
    // {
    //   id: 1,
    //   categoryName: 'Áo',
    // },
    // {
    //   id: 2,
    //   categoryName: 'Quần',
    // },
  ];
  visibleModal: boolean = false;
  action: string = '';
  titleModal: string = '';
  dataInformation: any = {
    categoryName: null,
  };


  async getLstData() {
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        categoryName: this.filter.categoryName,
        parentId: this.filter.parentId,
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
    console.log('chạy vào đây');
    try {
      await this._categoryService.getListCategory(dataRequest).then((item) => {
        this.spin = false;
        console.log(item)
        if (item?.result?.responseCode == '00') {
          this.lstData = item.data.map((item: any, index: number) => ({
            ...item,
            stt: (this.page - 1) * this.perPage + index + 1,
          }));
          this.total = item.dataCount;
          console.log(this.lstData)
        }
      });
    } catch (error) {
      this.spin = false;
      console.log(error)
    }
  }

  async getDataParent() {
    let dataRequest = {
      pageNumber: 0,
      pageSize: 0,
      filter: {
        // categoryName: this.filter.categoryName,
        // parentId: this.filter.parentId,
        // updatedAtSearch:
        //   this.filter.updatedAtSearch.length > 0
        //     ? [
        //         moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD'),
        //         moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD'),
        //       ]
        //     : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._categoryService.getListCategoryParent(dataRequest).then((item) => {
        this.spin = false;
        console.log(item)
        if (item?.result?.responseCode == '00') {
          this.lstCategoryParent = item.data.map((item: any, index: number) => ({
            ...item,
            stt: (this.page - 1) * this.perPage + index + 1,
          }));
        }
      });
    } catch (error) {
      this.spin = false;
    }
  }

  ngOnInit() {
    this.getLstData();
    this.getDataParent();
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
      this.getLstData();
    }
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
    this.titleModal = 'Thêm mới danh mục con';
    this.dataInformation.categoryName = '';
    this.dataInformation.createdBy = 'admin',
    this.dataInformation.updatedBy = 'admin'
  }

  handleUpdate(row: any) {
    this.action = 'update';
    this.visibleModal = true;
    this.titleModal = 'Cập nhật danh mục con';
    this.dataInformation = {
      id: row.id,
      categoryName: row.categoryName,
      parentId: row?.categoryParent?.id,
      updatedAt: row.updatedAt,
      createdBy: 'admin',
      updatedBy: 'admin'
    };
    console.log(this.dataInformation)
  }

  handleRead(row: any) {
    this.action = 'read';
    this.visibleModal = true;
    this.titleModal = 'Xem chi tiết danh mục con';
    this.dataInformation = {
      categoryName: row.categoryName,
      parentId: row.parentId,
      updatedAt: row.updatedAt,
    };
  }

  visibleModalDelete: boolean = false;
  handleDelete(row: any) {
    this.visibleModalDelete = true;
    this.dataInformation = {
      id: row.id,
      categoryName: row.categoryName,
      parentId: row.parentId,
      updatedAt: row.updatedAt,
    };
  }

  handleConfirmDelete() {
    // Xử lý xóa  (Khi gọi API thành công set dataInformation = {})
    this.deleteCategory();
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
        console.log(this.dataInformation);
        /// Xử lý thêm mới (Khi gọi API thành công set dataInformation = {})
        this.saveCategoryChild();
      }
      if (this.action == 'update') {
        /// Xử lý cập nhật (Khi gọi API thành công set dataInformation = {})
        this.updateCategory();
      }
    }
  }

  async saveCategoryChild(){
    this.spin = true;
    try {
      this._categoryService.saveCategory(this.dataInformation).then((item) => {
        console.log('item: ', item)
        if(item.result.responseCode == '00'){
          this.dataInformation = {};
          this._messageService.notificationSuccess(item.result.message)
          this.spin = false;
        } else {
          this._messageService.notificationError(item.result.message)
          this.spin = false;
        }
        this.visibleModal = false;
        this.getLstData();
      })
    } catch (error) {
      this._messageService.notificationError('Lỗi server')
      this.spin = false;
      this.visibleModal = false;
    }
  }

  async updateCategory() {
    this.spin = true;
    try {
      await this._categoryService.updateCategory(this.dataInformation.id, this.dataInformation).then((item) => {
        if(item.result.responseCode == '00'){
          this.dataInformation = {};
          this._messageService.notificationSuccess(item.result.message);
          this.getLstData();
        } else {
          this._messageService.notificationError(item.result.message);
        }
        this.spin = false;
        this.visibleModal = false;
      })
    } catch (error) {
      this.spin = false;
      this.visibleModal = false;
      console.log(error)
    }
  }

  async deleteCategory(){
    this.spin = true;
    try {
      await this._categoryService.deleteCategory(this.dataInformation.id).then((item) => {
        if(item.result.responseCode == '00'){
          this._messageService.notificationSuccess(item.result.message);
          this.getLstData()
        } else {
          this._messageService.notificationError(item.result.message);
        }
        this.spin = false;
        this.visibleModalDelete = false;
      })
    } catch (error) {
      this.spin = false;
      this.visibleModalDelete = false;
    }
  }

  columns: any[] = [
    {
      title: 'Tên danh mục',
      key: 'categoryName',
      width: '400px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Danh mục cha',
      key: 'categoryParent',
      width: '400px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ngày cập nhật',
      key: 'updatedAt',
      width: '250px',
      visible: true,
      sortOrder: '',
    },
  ];
}
