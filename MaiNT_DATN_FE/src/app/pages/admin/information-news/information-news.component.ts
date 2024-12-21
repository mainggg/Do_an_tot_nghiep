import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { environment } from '../../../../environment/environment.cloud';

@Component({
  selector: 'app-information-news',
  templateUrl: './information-news.component.html',
  styleUrl: './information-news.component.css'
})
export class InformationNewsComponent {
  // public editor = ClassicEditor;
  // value: any = "<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>"

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _newsService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  title: string = "Danh sách tin tức"
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
  urlPreview: string = environment.api_end_point_preview;

  id = -1;

  titleModal: string = "";
  visibleModalDelete: boolean = false;

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];


  columns: any[] = [
   
    {
      title: 'Tiêu đề',
      key: 'title',
      width: '200px',
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
      title: 'Tác giả',
      key: 'author',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Mô tả vắn tắt',
      key: 'briefDescription',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ẩn/hiện',
      key: 'visible',
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
    this._router.navigate(['./admin/information/news/add'])
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
    this._router.navigate(['./admin/information/news/' + this.action + '/' + row.id])

  }

  handleRead(row: any){
    this.action = 'read';
    this.visibleModal = true;
    this._router.navigate(['./admin/information/news/' + this.action + '/' + row.id])
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
                moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD'),
                moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD'),
              ]
            : [],
      },
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder,
    };
    try {
      await this._newsService.getListNews(dataRequest).then((res) => {
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
    await this._newsService.saveShop(this.dataInformation).then((res) => {
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
    await this._newsService.updateShop(this.dataInformation).then((res) => {
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
    await this._newsService.deleteNews(this.dataInformation.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(res.result.message);
      }
      this.spin = false;
      this.visibleModalDelete = false;
      this.dataInformation = {};
    })
  }

  async changeVisible(id: any){
    this.spin = true;
    await this._newsService.changeNewsVisible(id).then((res) => {
      if(res.result.responseCode == '00'){
        this._messageService.notificationSuccess("Thành công");
        this.getListData()
      }
      this.spin = false;
    })
  }

}
