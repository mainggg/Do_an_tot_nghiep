import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { LocalStorage } from '../../../../services/localstorage.service';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

  constructor(
    private _router: Router,
    private _paymentSuccess: UserService,
    private _localStorage: LocalStorage,
    private _maesgae: MessageService
  ){
    
  }


  ngOnInit(): void{
    this.saveBill()

  }

  async saveBill(){
    if(!localStorage.getItem('bill')){
      this._maesgae.notificationSuccess('Thành công');
      return;
    }
    let data = localStorage.getItem('bill');
    let dataBill = data ? JSON.parse(data) : [];
    await this._paymentSuccess.saveBill(JSON.stringify(dataBill)).then((res) => {
      if(res.result.responseCode == '00'){
        this._localStorage.removeAllShoppingCart();
        localStorage.removeItem('bill');
        this._maesgae.notificationSuccess('Thành công');
      } else {
        this._maesgae.notificationError("Có lỗi xảy ra")
      }
    })
  }

  clickHome(){
    this._router.navigate(['./home/home-page'])
  }

}
