import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../../services/localstorage.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment.cloud';
import { UserService } from '../user.service';
import { AdminService } from '../../admin/admin.service';
import { MessageService } from '../../../services/message.service';
import { firstValueFrom } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  dataInformation: any = {};
  constructor(private _localStorage: LocalStorage,
    private _router: Router,
    private _paymentService: UserService,
    private _userService: AdminService,
    private _message: MessageService,
    private _decimail: DecimalPipe
  ){}

  urlPreview: string = environment.api_end_point_preview;

  listProduct: any[] = [];

  tolal: any = 0;

  billProduct: any[] = [];

  userName: any = null;

  paymentMethod: any = 0;

  exchangeRate: any = 25000;



  ngOnInit() {
    this.dataInformation = {};
    this.getExchaneRate();
    if(localStorage.getItem('bill')){
      localStorage.removeItem('bill');
    }
    this.getUserDetail()
    const data = this._localStorage.getShoppingCart()
    this.listProduct = data ? JSON.parse(data) : [];
    this.totalPrice();
  }

  totalPrice(){
    this.tolal = 0;
    this.listProduct.map((item) => {
      this.tolal += item.price * item.quantity;
    })
  }

  columns: any[] = [
    {
      keyName: 'reciver',
      keyTitle: 'Họ và tên người nhận',
      check: true,
      isRequired: true,
    },
    {
      keyName: 'phoneNumber',
      keyTitle: 'Số điện thoại',
      check: true,
      isRequired: true,
    },
    {
      keyName: 'email',
      keyTitle: 'Email',
      check: true,
      isRequired: false,
    },
    {
      keyName: 'address',
      keyTitle: 'Địa chỉ nhận hàng',
      check: true,
      isRequired: true,
    },
    // {
    //   keyName: 'name',
    //   keyTitle: 'Địa chỉ nhà cụ thể',
    //   check: true,
    //   isRequired: true,
    // },
    {
      keyName: 'billNote',
      keyTitle: 'Lời nhắn',
      check: true,
    },
  ];

  addVoucher() {}

  async getUserDetail(){
    if(!localStorage.getItem('customerUserName')) return;
    this.userName = localStorage.getItem('customerUserName')
    await this._userService.getUserDetail(this.userName).then((res) => {
      if(res.result.responseCode == '00'){
        this.dataInformation = {
          reciver: res.data.firstName + ' ' + res.data.lastName,
          phoneNumber: res.data.phoneNumber,
          email: res.data.email,
          address: res.data.address,
          createdBy: this.userName
        }
      }
    })
  }

  validate(): boolean {
    if (!this.dataInformation.reciver || !this.dataInformation.phoneNumber || !this.dataInformation.address) {
      this._message.notificationWarning('Bạn phải nhập đầy đủ thông tin');
      return false; 
    }
    return true; 
  }

  async payProduct() {
    if (!this.validate()) {
      return; 
    }
    this.dataInformation.totalPrice = this.tolal;
    this.dataInformation.status = 1;
    this.dataInformation.paymentMethod = this.paymentMethod;
    this.listProduct.map((item: any) => {
      let data = {
        product: {
          id: item.id
        },
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
        //sales: item.sales
      }
      this.billProduct.push(data);
    })
    this.dataInformation.productBill = this.billProduct;
    if(this.paymentMethod == 2){
      let moneyUSD = this._decimail.transform((this.tolal / this.exchangeRate), '1.2-2');
      await this._paymentService.paypalReciver(moneyUSD).then((res) => {
        if(res.result.responseCode == '00'){
          localStorage.setItem('bill', JSON.stringify(this.dataInformation));
          window.location.href = res.data;
        }
      })
    } else if(this.paymentMethod == 1) {
      try{
        const item = await this._paymentService.saveBill(this.dataInformation);
        if(item.result.responseCode == '00'){
          this.dataInformation = {};
          this._localStorage.removeAllShoppingCart();
          this._router.navigate(['/home/payment-success'])
        } else this._message.notificationError(item.result.message || "Có lỗi xảy ra khi thanh toán!");
      } catch (error) {
        this._message.notificationError("Sản phẩm bạn vừa chọn đã hết hàng!")
      }
    } else {
      this._message.notificationWarning('Bạn phải chọn 1 hình thức thanh toán')
    }
    
    
  }

  async getExchaneRate(){
    await this._paymentService.getExchangeRate().then((res: any) => {
      let data = res.rates;
      //console.log(data)
      this.exchangeRate = data['VND'];
      
    })
  }


}
