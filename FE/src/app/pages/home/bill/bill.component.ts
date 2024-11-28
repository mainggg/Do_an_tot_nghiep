import { Component } from '@angular/core';
import moment from 'moment';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _billService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  title: string = "Danh sách hóa đơn"
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
      title: 'Số hóa đơn',
      key: 'billCode',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Người nhận',
      key: 'reciver',
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
      title: 'Email',
      key: 'email',
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
      title: 'Ghi chú',
      key: 'billNote',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ngày bán',
      key: 'createdAt',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Tổng tiền',
      key: 'totalPrice',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    
  ];

  status: number = 1;
  billId: number = -1;

  ngOnInit(){
    this.getListData();
  }

  onHandleConfirmStatus(id: any){
    //this.changeStatusConfirm(id, '2');
    this.billId = id;
    this.status = 2;
    this.visibleModalDelete = true;
  }

  onHandleCompleteStatus(id: any){
    this.billId = id;
    this.status = 3;
    this.visibleModalDelete = true;
    //this.changeStatusConfirm(id, '3');
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
    this._router.navigate(['./admin/bill/detail/' + row.id])
  }
  
  handleDelete(row: any){
    this.dataInformation.id = row.id;
    this.visibleModalDelete = true;
  }

  onHandleCancel(){
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.visibleModalDelete = false;
    this.changeStatusConfirm(this.billId, this.status);
  
  }


  async getListData(){
    this.spin = true;
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        billCode: this.filter.billCode,
        address: this.filter.address,
        phoneNumber: this.filter.phoneNumber,
        email: this.filter.email,
        reciver: this.filter.reciver,
        billNote: this.filter.billNote,
        status: this.filter.status,
        totalPrice: this.filter.totalPrice,
        createdBy: localStorage.getItem("customerUserName"),
        updatedAtSearch:
          this.filter.updatedAtSearch.length > 0
            ? [
                moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD'),
                moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD'),
              ]
            : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._billService.getAllBill(dataRequest).then((res: any) => {
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

  async changeStatusConfirm(id: any, status: any){
    this.spin = true;
    await this._billService.changeStatus(id, status).then((res: any) => {
      if(res.result.responseCode == '00'){
        this._messageService.notificationSuccess("Xử lý thành công");
        this.getListData()
        this.spin = false;
      }
    })
  }



}
