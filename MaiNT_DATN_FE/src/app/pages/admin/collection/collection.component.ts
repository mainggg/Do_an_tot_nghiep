import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import moment from 'moment';
import { environment } from '../../../../environment/environment.cloud';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _collectionService: AdminService,
    private __fileService: FileService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  previewUrl: any = environment.api_end_point_preview;

  tempFileDocument: File[] = [];
  savedFileName: any = [];

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
    products: []
  }

  productsListSelect: any = [];

  listIdSelected: any = [];

  listProduct: any = [];

  id = -1;

  titleModal: string = "";
  visibleModalDelete: boolean = false;

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];


  columns: any[] = [
   
    {
      title: 'Tên bộ sưu tập',
      key: 'name',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ảnh',
      key: 'avatar',
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

  onHandlePagination(event: any) {}

  handleClickButton(){
    this.visibleModal = true;
    this.titleModal = "Thêm mới bộ sưu tập";
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
      this.saveCollection();
    } else if(this.action == 'update'){
      this.updateCollection()
    }
  }

  // TODO: selector: app-breadscrumb


  handleUpdate(row: any){
    this.action = "update";
    this.visibleModal = true;
    this.titleModal = "Cập nhật bộ sưu tập"
    this.dataInformation = {
      id: row.id,
      name: row.name,
      files: row.files,
      
    }
    row.products.map((item: any) => {
      this.listIdSelected.push(item.id)
  })

  }

  handleRead(row: any){
    this.action = 'read';
    this.visibleModal = true;
    this.titleModal = "Xem chi tiết bộ sưu tập"
    this.dataInformation = {
      id: row.id,
      name: row.name,
      files: row.files,
      
    }
    row.products.map((item: any) => {
      this.listIdSelected.push(item.id)
  })
  
  }
  
  handleDelete(row: any){
    this.dataInformation.id = row.id;
    this.visibleModalDelete = true;
  }

  onHandleCancel(){
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.deleteCollection();
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
      await this._collectionService.getListCollection(dataRequest).then((res) => {
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

  async getListProduct(){
    this.spin = true;
    let dataRequest = {
      pageNumber: 0,
      pageSize: 0,
      filter: {
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._collectionService.getListProduct(dataRequest).then((res) => {
        if (res.result.responseCode == '00') {
          this.listProduct = res.data;
        }
      })
    } catch (error) {
      
    }
  }

  async saveCollection(){
    this.dataInformation.files = this.savedFileName;
    this.listIdSelected.map((item: any) => {
      let prouct = {
        id: item?.id,
      }
      this.productsListSelect.push(prouct);
    })
    this.dataInformation.products = this.productsListSelect
    this.spin = true;
    await this._collectionService.saveCollection(this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};
    })
  }

  async updateCollection(){
    this.spin = true;
    this.listIdSelected.map((item: any) => {
      let prouct = {
        id: item?.id,
      }
      this.productsListSelect.push(prouct);
    })
    this.dataInformation.products = this.productsListSelect
    this.dataInformation.files = this.savedFileName;
    await this._collectionService.updateCollection(this.dataInformation.id ,this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModal = false;
      this.dataInformation = {};
    })
  }

  async deleteCollection(){
    this.spin = true;
    await this._collectionService.deleteCollection(this.dataInformation.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModalDelete = false;
      this.dataInformation = {};
    })
  }

  async uploadCollection(event: any){
    console.log(event);
    this.tempFileDocument = event;
    const formData = new FormData();
    this.tempFileDocument.forEach((file) => {
      formData.append('files', file, file.name);
    });

    const response = await this.__fileService.uploadFileDocument(formData);

    
    if (response.result.responseCode == '00') {
      let listFile = response.data.map((item: any) => ({
        savedFileName: item.savedFileName,
        fileName: item.fileName,
      }));
      console.log(listFile);

      this.savedFileName = listFile;
    }
  }

}
