import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { FileService } from '../../../services/file.service';
import { AdminService } from '../admin.service';
import { environment } from '../../../../environment/environment.cloud';

@Component({
  selector: 'app-information-banner',
  templateUrl: './information-banner.component.html',
  styleUrl: './information-banner.component.css'
})
export class InformationBannerComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private __fileService: FileService,
    private __bannerService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  //khai báo up file
  currentDataUpload: any = {};
  tempFileDocument: File[] = [];
  savedFileName: any[] = [];
  urlPreview: string = environment.api_end_point_preview;

  title: string = "Danh sách Banner"
  total: number = 10
  validAction: string = ""
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  filter: any = {};
  action: string = "";
  
  dataInformation: any = {
  }
  spin: any = false;

  titleModal: string = "";
  visibleModalDelete: boolean = false;
  

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];
  switchValue = false;


  columns: any[] = [
   
    {
      title: 'Ảnh banner',
      key: 'imageBanner',
      width: '150px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ẩn/hiện',
      key: 'visible',
      width: '100px',
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

  onHandlePagination(event: any) {}

  ngOnInit() {
    this.getListData()
  }

  handleCreate(){
    this.visibleModal = true;
    this.titleModal = "Thêm mới banner";
    this.action = 'create';
    this.dataInformation.imageBanner = '';
  }

  onHandleChangeColumn($event: any) {
    this.columns = [...$event];
    // localStorage.setItem('columnShipBunkering', JSON.stringify(this.columns));
  }

  async getListData(){
    this.spin = true;
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        //categoryName: this.filter.ban,
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
      await this.__bannerService.getListBanner(dataRequest).then((res) => {
        if (res.result.responseCode == '00') {
          this.lstData = res.data.map((item: any, index: number) => ({
            ...item,
            stt: (this.page - 1) * this.perPage + index + 1,
          }));
          this.total = res.dataCount;
          console.log('data: ', this.lstData)
        }
        this.spin = false;
      })
    } catch (error) {
      this.spin = false;
    }
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
    
    if(this.savedFileName.length > 0){
      this.dataInformation = {
        imageBanner: this.savedFileName[0].savedFileName,
        createdBy: 'admin',
        updatedBy: 'admin'
      }
      this.saveBanner()
      
    }
    
  }

  async saveBanner(){
    try {
      await this.__bannerService.saveBanner(this.dataInformation).then((res) => {
        if(res.result.responseCode == '00'){
          this.visibleModal = false;
          this._messageService.notificationSuccess(res.result.message)
          this.getListData(); 
        }
      })
    } catch (error) {
      
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
    this.titleModal = "Cập nhật banner"

  }

  handleRead(row: any){
    this.action = 'read';
    this.visibleModal = true;
    this.titleModal = "Xem chi tiết banner"
  }
  
  handleDelete(row: any){
    this.visibleModalDelete = true;
    this.dataInformation.id = row.id;

  }

  onHandleCancel(){
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.visibleModalDelete = false;
    this.deleteBanner()
  }

  handleChangeVisible(id: any){
    this.changeVisible(id);
  }

  async changeVisible(id: any){
    await this.__bannerService.changeBanner(id).then((item) => {
      if(item.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(item.result.message);
      }
    })
  }

  async uploadBanner(event: any){
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

  async deleteBanner(){
    this.spin = true;
    await this.__bannerService.deleteBanner(this.dataInformation.id).then((item) => {
      if(item.result.responseCode == '00'){
        this.getListData();
        this._messageService.notificationSuccess(item.result.message);
      }
    })
  }


}
