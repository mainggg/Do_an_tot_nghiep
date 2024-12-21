import { Component } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';
import moment from 'moment';

@Component({
  selector: 'app-information-shop',
  templateUrl: './information-shop.component.html',
  styleUrl: './information-shop.component.css'
})
export class InformationShopComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _shopService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  title: string = "Danh sách cửa hàng"
  total: number = 10
  validAction: string = ""
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  filter: any = {
    updatedAtSearch: [],
    shopName: "",
    address: "",
    phoneNumber: ""
  };
  action: string = "";
  spin: boolean = false;
  dataInformation: any = {
    parentId: 0
  }

  id = -1;

  titleModal: string = "";
  visibleModalDelete: boolean = false;

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];


  columns: any[] = [
   
    {
      title: 'Tên cửa hàng',
      key: 'shopName',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Địa chỉ',
      key: 'address',
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
      title: 'Thời gian cập nhật',
      key: 'updatedAt',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    
  ];

  ngOnInit(){
    this.getListData();
  }

  onHandlePagination(event: any) {}

  handleClickButton(){
    this.visibleModal = true;
    this.titleModal = "Thêm mới cửa hàng";
    this.action = 'create';
    this.dataInformation = {
      createdBy: 'admin',
      updatedBy: 'admin'
    }
  }

  onHandleChangeColumn($event: any) {
    this.columns = [...$event];
    // localStorage.setItem('columnShipBunkering', JSON.stringify(this.columns));
  }

  
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
    if(this.action == 'create'){
      this.saveShop();
    } else if(this.action == 'update'){
      this.updateShop()
    }
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

  handleUpdate(row: any){
    this.action = "update";
    this.visibleModal = true;
    this.titleModal = "Cập nhật cửa hàng"
    this.dataInformation = {
      id: row.id,
      shopName: row.shopName,
      address: row.address,
      phoneNumber: row.phoneNumber
    }

  }

  handleRead(row: any){
    this.action = 'read';
    this.visibleModal = true;
    this.titleModal = "Xem chi tiết cửa hàng"
    this.dataInformation = {
      id: row.id,
      shopName: row.shopName,
      address: row.address,
      phoneNumber: row.phoneNumber
    }
  }
  
  handleDelete(row: any){
    this.dataInformation.id = row.id;
    this.visibleModalDelete = true;
  }

  onHandleCancel(){
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.deleteShop();
  }


  async getListData(){
    this.spin = true;
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        shopName: this.filter.shopName,
        address: this.filter.address,
        phoneNumber: this.filter.phoneNumber,
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
      await this._shopService.getListShop(dataRequest).then((res) => {
        if (res.result.responseCode == '00') {
          this.lstData = res.data.map((item: any, index: number) => ({
            ...item,
            stt: (this.page - 1) * this.perPage + index + 1,
          }));
          this.total = res.dataCount;
        }
        this.spin = false;
      })
    } catch (error) {
      this.spin = false;
    }
  }

  async saveShop(){
    this.spin = true;
    await this._shopService.saveShop(this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};
    })
  }

  async updateShop(){
    this.spin = true;
    await this._shopService.updateShop(this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};
    })
  }

  async deleteShop(){
    this.spin = true;
    await this._shopService.deleteShop(this.dataInformation.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModalDelete = false;
      this.dataInformation = {};
    })
  }

}
