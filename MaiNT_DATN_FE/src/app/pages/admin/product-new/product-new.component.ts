import { Component } from '@angular/core';
import moment from 'moment';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrl: './product-new.component.css'
})
export class ProductNewComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _productImportService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  title: string = "Danh sách nhập hàng"
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

  product: any = {};
  color: any = '';
  size: any = '';

  id = -1;

  titleModal: string = "";
  visibleModalDelete: boolean = false;

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];
  listProduct: any[] = [];
  listColor: any[] = [];
  listSize: any[] = [];


  columns: any[] = [
   
    {
      title: 'Tên sản phẩm',
      key: 'product',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Size',
      key: 'size',
      width: '90px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Màu sắc',
      key: 'color',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Số lượng nhập',
      key: 'quantityImport',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Giá nhập',
      key: 'priceImport',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Thành tiền',
      key: 'totalPrice',
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
    this.getListProduct();
  }

  onHandlePagination(event: any) {
    this.page = event.page;
    this.perPage = event.size;
    this.getListData();
  }

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
    console.log(this.action)
    this.visibleModal = false;
    if(this.action == 'create'){
      this.saveProductNew();
    } else if(this.action == 'update'){
      this.updateProductNew();
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
    this.titleModal = "Cập nhật sản phẩm nhập"
    this.dataInformation = {
      id: row.id,
      productEntity: row.product,
      color: row.color,
      size: row.size,
      quantityImport: row.quantityImport,
      priceImport: row.priceImport
      
    }
    this.getProduct();
    console.log('data1:', this.dataInformation);
    this.visibleModal = true;
  }

  handleRead(row: any){
    this.action = 'read';
    this.titleModal = "Xem chi sản phẩm nhập"
    this.dataInformation = {
      id: row.id,
      productEntity: row.product,
      color: row.color,
      size: row.size,
      quantityImport: row.quantityImport,
      priceImport: row.priceImport
    }
    this.visibleModal = true;
  }
  
  handleDelete(row: any){
    this.dataInformation.id = row.id;
    this.visibleModalDelete = true;
  }

  onHandleCancel(){
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.deleteProductNew();
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
                moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD'),
                moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD'),
              ]
            : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._productImportService.getListProductNew(dataRequest).then((res) => {
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

  async saveProductNew(){
    this.spin = true;
    let idProduct = this.dataInformation.productEntity.id;
    this.dataInformation.productEntity = {};
    this.dataInformation.productEntity.id = idProduct;
    await this._productImportService.saveProductImport(this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};
    })
  }

  async updateProductNew(){
    this.spin = true;
    await this._productImportService.updateProductImport(this.dataInformation.id, this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};  
    })
  }

  async deleteProductNew(){
    this.spin = true;
    await this._productImportService.deleteProductImpory(this.dataInformation.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModalDelete = false;
      this.dataInformation = {};
    })
  }

  async getListProduct(){
    let dataRequest = {
      pageNumber: 0,
      pageSize: 0,
      filter: {
        
      }
    }
    await this._productImportService.getListProduct(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        this.listProduct = res.data;
      }
    })
  }

  async getProduct(){
    await this._productImportService.getProduct(this.dataInformation.productEntity.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.listColor = res.data.productColor;
        this.listSize = res.data.productSize;
      }
    })
  }

}
