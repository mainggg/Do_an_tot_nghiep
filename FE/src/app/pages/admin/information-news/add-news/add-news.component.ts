import { Component } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from '../../../../services/file.service';
import { AdminService } from '../../admin.service';
import { environment } from '../../../../../environment/environment.cloud';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css'
})
export class AddNewsComponent {
  public editor = ClassicEditor;

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private __fileService: FileService,
    private _newsService: AdminService

  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  currentDataUpload: any = {};
  tempFileDocument: File[] = [];
  savedFileName: any[] = [];
  urlPreview: string = environment.api_end_point_preview;
  avatarUrl: any[] = [];
  descriptionUrl: any[] = [];

  title: string = "Thêm mới tin tức"
  total: number = 10
  validAction: string = ""
  countSort = 0;
  sortOrder: string = 'DESC';
  sortProperty: string = 'updatedAt';
  filter: any = {
    updatedAtSearch: [],
    
  };
  action: string = "";
  spin: boolean = false;
  dataInformation: any = {
    createdBy: 'admin',
    content: '',
  }

  id = -1;

  titleModal: string = "";
  visibleModalDelete: boolean = false;
  isVisibaleModalNavigate: boolean = false;
  isVisibaleModalSave: boolean = false;


  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];
  listSize: any[] = [];
  listColor: any[] = [];
  listCategory: any[] = [];
  listOfSelectedValueColor: any[] = [];
  listOfSelectedValueSize: any[] = [];
  listOfSelectCategory: any = {};



  columns: any[] = [
   
    {
      title: 'Tiêu đề',
      key: 'title',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true,
    },
    {
      title: 'Tác giả',
      key: 'author',
      width: '150px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    
    {
      title: 'Ảnh',
      key: 'avatar',
      width: '150px',
      visible: true,
      sortOrder: '',
      isRequired: true
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
      isRequired: true
    },
    
  ];

  validate(){
    for(let column of this.columns){
      if(column.isRequired && this.dataInformation[column.key] == '' 
      && (column.key === 'title' || column.key === 'author' || column.key == 'visiable')){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc')
        return false;
      }
     
      if(column.key == 'avatar' && this.avatarUrl.length <= 0){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc')
        return false;
      }
    }
    return true;
  }

  onHandleModalSave(){
    this.isVisibaleModalSave = true;
  }

  onHandleCancelModalSave(event: any) {
    this.isVisibaleModalSave = false;
  }

  onHandleConfirmSave(event: any) {
    this.isVisibaleModalSave = false;
    
    if(this.validate()){
      this.dataInformation.avatar = this.avatarUrl[0].savedFileName;
      console.log(this.dataInformation)
      this.saveNews();
      
    }
    //this._router.navigate(['./admin/product/information']);
  }

  onHandleNavigate() {
    this.isVisibaleModalNavigate = true;
  }

  onHandleCancelModalNavigate(event: any) {
    this.isVisibaleModalNavigate = false;
  }

  onHandleConfirmNavigate(event: any) {
    this.isVisibaleModalNavigate = false;
    this._router.navigate(['./admin/information/news']);
  }

  ngOnInit(){
    this.getListColor();
    this.getListSize();
    this.getListCate()
  }

  async getListColor(){
    let dataRequestColor = {
      pageNumber: 0,
      pageSize: 0,
      filter: {

      }
    }
    await this._newsService.getListColor(dataRequestColor).then((res) => {
      if(res.result.responseCode == '00'){
        this.listColor = res.data;
        console.log(this.listColor)
      }
    })
  }

  async getListSize(){
    let dataRequestSize = {
      pageNumber: 0,
      pageSize: 0,
      filter: {

      }
    }
    await this._newsService.getListSize(dataRequestSize).then((res) => {
      if(res.result.responseCode == '00'){
        this.listSize = res.data;
      }
    })
  }

  async getListCate(){
    let dataRequestCate = {
      pageNumber: 0,
      pageSize: 0,
      filter: {

      }
    }
    await this._newsService.getListCategory(dataRequestCate).then((res) => {
      if(res.result.responseCode == '00'){
        this.listCategory = res.data;
      }
    })
  }

  async uploadAvatar(event: any){
    console.log(event);

    if(event.length !== 0) {
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

      this.avatarUrl = listFile;
    }
    }
  }

  async uploadDescriptionUrl(event: any){
    
    if(event && event.length !== 0) {
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
      this.descriptionUrl = listFile;
    }
    }
  }

  async deleteFile(event: any){
    this.avatarUrl = [];
  }

  async saveNews(){
    try {
      await this._newsService.saveNews(this.dataInformation).then((res) => {
        if(res.result.responseCode == '00'){
          this._messageService.notificationSuccess(res.result.message);
        }
        this._router.navigate(['./admin/information/news'])
      })
    } catch (error) {
      
    }
  }

}
