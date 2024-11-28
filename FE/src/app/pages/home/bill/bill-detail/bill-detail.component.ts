import { Component } from '@angular/core';
import { environment } from '../../../../../environment/environment.cloud';
import { MessageService } from '../../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../admin.service';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.css'
})
export class BillDetailComponent {

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
  title: string = "THÔNG TIN HÓA ĐƠN"
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

  avatarUrl: any[] = [];

  isVisibaleModalNavigate: boolean = false;
  isVisibaleModalNavigateUpdate: boolean = false;
  totalPrice: any = 0;


  ngOnInit(): void{
    this.getData();
    console.log(this.dataInformation)
  }

  
  onHandleUpdate(event: any){
   this.isVisibaleModalNavigateUpdate = true;
    // this.dataInformation.avatar = this.
  }

  onHandleCancelModalNavigateUpdate(event: any){
    this.isVisibaleModalNavigateUpdate = false;
  }

  onHandleConfirmNavigateUpdate(event: any){
    this.isVisibaleModalNavigateUpdate = false;
    this.changeStatusConfirm(this.dataInformation.id, this.dataInformation.status + 1);
    
  }

  openModalBack(event: any){
    this.isVisibaleModalNavigate = true;
  }

  onHandleCancelModalNavigate(event: any){
    this.isVisibaleModalNavigate = false
  }

  onHandleConfirmNavigate(event: any){
    this.isVisibaleModalNavigate = false;
    this._router.navigate(['./admin/bill'])
  }

  onHandleConfirmStatus(id: any){
    //this.changeStatusConfirm(id, '2');
    this.isVisibaleModalNavigateUpdate = true;
  }

  onHandleCompleteStatus(id: any){
    
    this.isVisibaleModalNavigateUpdate = true;
    //this.changeStatusConfirm(id, '3');
  }


  async getData(){
    this.spin = true;
    await this._productService.getDetailBill(this.id).then((res: any) => {
      if(res.result.responseCode == '00'){
        this.dataInformation = res.data;
        this.dataInformation?.productBill?.map((item: any) => {
          this.totalPrice += item.price * item.quantity;
        })
        this.spin = false;
      }
    })
  }

  async changeStatusConfirm(id: any, status: any){
    this.spin = true;
    await this._productService.changeStatus(id, status).then((res: any) => {
      if(res.result.responseCode == '00'){
        this._messageService.notificationSuccess("Xử lý thành công");
        this.spin = false;
        this._router.navigate(['./admin/bill'])

      }
    })
  }

 
}
