import { Component } from '@angular/core';
import { LocalStorage } from '../../../services/localstorage.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment.cloud';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrl: './gio-hang.component.css'
})
export class GioHangComponent {

  constructor(private _localStorage: LocalStorage,
    private _router: Router,
  ){}

  urlPreview: string = environment.api_end_point_preview;

  listProduct: any[] = [];

  tolal: any = 0;

  ngOnInit(): void{
    const data = this._localStorage.getShoppingCart()
    this.listProduct = data ? JSON.parse(data) : [];
    this.totalPrice();
  }

  changeQuantity(operator: string ,dataInput: any){
    
    if(operator == '-'){
      if(dataInput.quantity > 1){
        dataInput.quantity = -1;
      } else {
        dataInput.quantity = 0;
      }
      
    }
    if(operator == '+'){
      dataInput.quantity = 1;
    }
    this._localStorage.setShoppingCart(dataInput);
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

  removeShoppingCart(dataInput: any){
    this._localStorage.removeShoppingCart(dataInput);
    const data = this._localStorage.getShoppingCart()
    this.listProduct = data ? JSON.parse(data) : [];
    this.totalPrice();
  }

  navigatePayment(){
    this._router.navigate(['./home/payment']);
  }


}
