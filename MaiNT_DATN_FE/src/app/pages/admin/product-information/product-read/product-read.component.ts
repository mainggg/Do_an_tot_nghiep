import { Component } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { environment } from '../../../../../environment/environment.cloud';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.css'
})
export class ProductReadComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _productService: AdminService,
    private __fileService: FileService,
    private _active: ActivatedRoute

  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  currentDataUpload: any = {};
  tempFileDocument: File[] = [];
  savedFileName: any[] = [];
  descriptionUrl: any[] = [];
  urlPreview: string = environment.api_end_point_preview;
  id: any = this._active.snapshot.params['id'];
  action = this._active.snapshot.params['action'];
  title: string = "Cập nhật sản phẩm"
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
  spin: boolean = false;
  dataInformation: any = {
    
  }


  titleModal: string = "";
  visibleModalDelete: boolean = false;

  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];
  listSize: any[] = [];
  listColor: any[] = [];
  listCate: any[] = [];
  listOfSelectedValueColor: any[] = [];
  listOfSelectedValueSize: any[] = [];
  selectedValueCategory: any = -1;

  avatarUrl: any[] = [];

  isVisibaleModalNavigate: boolean = false;
  isVisibaleModalNavigateUpdate: boolean = false;


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
      title: 'Danh mục sản phẩn',
      key: 'category',
      width: '200px',
      visible: true,
      sortOrder: '',
      isRequired: true
    }
    
  ];

  ngOnInit(){
    if(this.action == 'update'){
      this.title = "Cập nhật sản phẩm";
    } else {
      this.title = "Xem chi tiết sản phẩm";
    }
    this.getDetail()
    this.getListColor();
    this.getListSize();
    this.getListCategory()
  }

  validate(){
    for(let column of this.columns){
      if(column.isRequired && this.dataInformation[column.key] == '' 
      && column.key !== 'productSize' && column.key !== 'productColor' && column.key != 'avatar'){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc')
        return false;
      }
      if((column.key == 'productSize' || column.key == 'productColor')
      && (this.listOfSelectedValueColor.length <= 0 || this.listOfSelectedValueSize.length <= 0)){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc Size')
        return false;
      }
      if(column.key != 'avatar' && this.dataInformation.avatarUrl.length <= 0){
        this._messageService.notificationWarning('Bạn phải nhập đầy đủ thông tin bắt buộc Ảnh')
        return false;
      }
    }
    return true;
  }

  onHandleUpdate(event: any){
    this.isVisibaleModalNavigateUpdate = true;
    this.dataInformation.category.id = this.selectedValueCategory;
    this.dataInformation.productSize = this.listOfSelectedValueSize;
    this.dataInformation.productColor = this.listOfSelectedValueColor;
    // this.dataInformation.avatar = this.
  }

  onHandleCancelModalNavigateUpdate(event: any){
    this.isVisibaleModalNavigateUpdate = false;
  }

  onHandleConfirmNavigateUpdate(event: any){
    this.isVisibaleModalNavigateUpdate = false;
    //console.log(this.descriptionUrl)
    // for(let item of this.descriptionUrl){
    //   if(item.response !== undefined){
    //     this.dataInformation.imageDescription.push(item?.response)
    //   }
    // }
  
    console.log(this.dataInformation);
    this.updateProduct()
    this._router.navigate(['./admin/product/information']);
  }

  openModalBack(event: any){
    this.isVisibaleModalNavigate = true;
  }

  onHandleCancelModalNavigate(event: any){
    this.isVisibaleModalNavigate = false
  }

  onHandleConfirmNavigate(event: any){
    this.isVisibaleModalNavigate = false;
    this._router.navigate(['./admin/product/information'])
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


  async getListCategory(){
    let dataRequestColor = {
      pageNumber: 0,
      pageSize: 0,
      filter: {

      }
    }
    await this._productService.getListCategory(dataRequestColor).then((res) => {
      if(res.result.responseCode == '00'){
        this.listCate = res.data;
      }
    })
  }

  async getDetail(){
    this.spin = true;
    this._productService.getProduct(this.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.dataInformation = res.data;
        this.listOfSelectedValueColor = this.dataInformation.productColor;
        this.listOfSelectedValueSize = this.dataInformation.productSize;
        this.selectedValueCategory = this.dataInformation.category.id;
        let avatar = {
          savedFileName: this.dataInformation.avatar,
        }
        this.avatarUrl.push(avatar);
      }
      this.spin = false;
    })
  }

  async updateProduct(){
    await this._productService.updateProduct(this.id, this.dataInformation).then((res) => {
      if(res.result.responseCode == '00'){
        this._messageService.notificationSuccess(res.result.message);
        this._router.navigate(['./admin/product/information']);
      }
    })
  }

  async uploadAvatar(event: any){
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

  idFile: any = 0;

  async uploadDescriptionUrl(event: any){
    
    if(event && event.length !== 0) {
      this.tempFileDocument = event;
    const formData = new FormData();
    this.tempFileDocument.forEach((file) => {
      formData.append('files', file, file.name);
    });
    const response = await this.__fileService.uploadFileDocument(formData);
    if (response.result.responseCode == '00') {
      let listFile = response.data;
      for(let item of listFile){
        this.dataInformation.imageDescription.push(item);
      }
      
    }
    }
  }

  async deleteFile(event: any){
    this.avatarUrl = [];
  }

}
