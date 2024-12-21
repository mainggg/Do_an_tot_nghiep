import { Component } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin.service';
import { environment } from '../../../../environment/environment.cloud';
import moment from 'moment';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css'
})
export class ProductInformationComponent {

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _translateService: TranslateService,
    private _productService: AdminService
  ) {
    this._translateService
      .get('notification.valid_action') // <- lấy theo key nào (Ex: 'notification.valid_action', ...)
      .subscribe((item) => (this.validAction = item)); // <- lấy dữ liệu từ file JSON ngôn ngữ
  }

  urlPreview = environment.api_end_point_preview;

  title: string = "Danh sách sản phẩm"
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

  listCategory: any[] = [];

  titleModal: string = "";
  visibleModalDelete: boolean = false;

  id = -1;
  // TODO: selector app-pagination
  page: number = 1;
  perPage: number = 10;

  lstData: any[] = [];


  columns: any[] = [
   
    {
      title: 'Tên sản phẩm',
      key: 'productName',
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
    },
    {
      title: 'Danh mục sản phẩm',
      key: 'category',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Giá bán',
      key: 'price',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Số lượng còn',
      key: 'quantity',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Số lượng đã bán',
      key: 'totalQuantitySales',
      width: '200px',
      visible: true,
      sortOrder: '',
    },
    {
      title: 'Số lượng nhập',
      key: 'totalQuantityImported',
      width: '200px',
      visible: true,
      sortOrder: '',
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
    },
    {
      title: 'Màu sắc',
      key: 'productColor',
      width: '200px',
      visible: true,
      sortOrder: '',
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
    // {
    //   title: 'Thời gian cập nhật',
    //   key: 'updatedAt',
    //   width: '200px',
    //   visible: true,
    //   sortOrder: '',
    // },
    
  ];

  ngOnInit(){
    this.getListProduct();
    this.getListCate();
  }

  onHandlePagination(event: any) {
    this.page = event.page;
    this.perPage = event.size;
    this.getListProduct();
  }

  handleClickButton(){
    this._router.navigate(['./admin/product/information/create'])
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
    // this.filter[column.key] = event;
    this.getListProduct();
    
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
      
    } else if(this.action == 'update'){
      
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
    this._router.navigate(['./admin/product/information/' + this.action + '/' + row.id])

  }

  handleRead(row: any){
    this.action = "read";
    this._router.navigate(['./admin/product/information/' + this.action + '/' + row.id])
  }
  
  handleDelete(row: any){
    this.visibleModalDelete = true;
    this.dataInformation.id = row.id;
  }

  onHandleCancel(){
    this.visibleModalDelete = false;
    this.visibleModal = false;
  }

  handleConfirmDelete(){
    this.deleteProduct();
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

  async getListProduct(){
    this.spin = true;
    let dataRequest = {
      pageNumber: this.page - 1,
      pageSize: this.perPage,
      filter: {
        productName: this.filter.productName,
        price: this.filter.price,
        quantity: this.filter.quantity,
        totalQuantitySales: this.filter.totalQuantitySales,
        totalQuantityImported: this.filter.totalQuantityImported,
        description: this.filter.description,
        productMaterial: this.filter.productMaterial,
        // productSize: this.filter.productSize,
        // productColor: this.filter.productColor,
        productForm: this.filter.productForm,
        sales: this.filter.sales,
        category: this.filter.category,
        updatedAtSearch:
          this.filter.updatedAtSearch.length > 0
            ? [
                moment(this.filter.updatedAtSearch[0]).format('YYYY-MM-DD'),
                moment(this.filter.updatedAtSearch[1]).format('YYYY-MM-DD'),
              ]
            : [],
      },
      sortOrder: this.sortOrder,
      sortProperty: this.sortProperty
    }
    await this._productService.getListProduct(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        this.lstData = res.data;
        this.total = res.dataCount
      }
      this.spin = false;
    })
  }

  async deleteProduct(){
    this._productService.delete(this.dataInformation.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.visibleModalDelete = false;
        this.getListProduct();
        this._messageService.notificationSuccess(res.result.message);
      } else {
        this._messageService.notificationError(res.result.message);
      }
    })
  }

}
