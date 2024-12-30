import { Component } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { environment } from '../../../../../environment/environment.cloud';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private __fileService: FileService,
    private _productService: AdminService

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

  title: string = "Thêm mới sản phẩm"
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
    imageDescription: []
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
      title: 'Tên sản phẩm',
      key: 'productName',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    
    {
      title: 'Giá bán',
      key: 'price',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    {
      title: 'Giảm giá',
      key: 'sales',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Size',
      key: 'productSize',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    {
      title: 'Màu sắc',
      key: 'productColor',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    {
      title: 'Kiểu dáng',
      key: 'productForm',
      width: '200px',
      visible: true,
      sortOrder: '',

    },
    {
      title: 'Chất liệu',
      key: 'productMaterial',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Thiết kế',
      key: 'description',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Ảnh',
      key: 'avatar',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    },
    {
      title: 'Danh mục sản phẩm',
      key: 'category',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    }
    
  ];

  validate(){
    for(let column of this.columns){
      console.log(this.columns)
      if(column.isRequired && this.dataInformation[column.key] === undefined 
        && column.key !== 'avatar' && column.key !== 'productSize' && column.key !== 'productColor'){
        console.log('Key:', column.key, 'Value:', this.dataInformation[column.key]);
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc!')
        return false;
      }
      if((column.key == 'productSize' || column.key == 'productColor')
      && (this.listOfSelectedValueColor.length <= 0 || this.listOfSelectedValueSize.length <= 0)){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc!')
        return false;
      }
      if(column.key != 'avatar' && this.avatarUrl.length <= 0){
        this._messageService.notificationWarning('Bạn phải đính kèm Ảnh!')
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
    this.dataInformation.productColor = this.listOfSelectedValueColor;
    this.dataInformation.productSize = this.listOfSelectedValueSize;
    this.dataInformation.category = this.listOfSelectCategory;
    
    if(this.validate()){
      this.dataInformation.avatar = this.avatarUrl[0].savedFileName;
      console.log(this.descriptionUrl)
      // for(let item of this.descriptionUrl){
      //   this.dataInformation.imageDescription.push(item?.response)
      // }
      this.dataInformation.imageDescription = this.descriptionUrl;
      this.saveProduct();
      this._router.navigate(['./admin/product/information']);
    }
    // this.dataInformation.avatar = this.avatarUrl[0].savedFileName;
    //   console.log(this.descriptionUrl)
    //   for(let item of this.descriptionUrl){
    //     this.dataInformation.imageDescription.push(item?.response)
    //   }
      //this.saveProduct(); 
  }

  onHandleNavigate() {
    this.isVisibaleModalNavigate = true;
  }

  onHandleCancelModalNavigate(event: any) {
    this.isVisibaleModalNavigate = false;
  }

  onHandleConfirmNavigate(event: any) {
    this.isVisibaleModalNavigate = false;
    this._router.navigate(['./admin/product/information']);
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
    await this._productService.getListColor(dataRequestColor).then((res) => {
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
    await this._productService.getListSize(dataRequestSize).then((res) => {
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
    await this._productService.getListCategory(dataRequestCate).then((res) => {
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

  async saveProduct(){
    try {
      await this._productService.saveProduct(this.dataInformation).then((res) => {
        if(res.result.responseCode == '00'){
          this._messageService.notificationSuccess(res.result.message);
        }
        this._router.navigate(['./admin/product/information'])
      })
    } catch (error) {
      
    }
  }

}
