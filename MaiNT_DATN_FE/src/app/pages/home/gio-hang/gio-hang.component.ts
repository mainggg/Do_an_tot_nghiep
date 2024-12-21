import { Component } from '@angular/core';
import { LocalStorage } from '../../../services/localstorage.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment.cloud';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrl: './gio-hang.component.css'
})
export class GioHangComponent {

  constructor(private _localStorage: LocalStorage,
    private _router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
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

  navigatePayment() {
    this.checkBillStatus().subscribe(
      (response: any) => {
        if (response.result.responseCode === '00') {
          this._localStorage.removeAllShoppingCart();
          this._router.navigate(['/home/payment-success']);
        } else {
          this.showErrorMessage(response.result.message || 'Có lỗi xảy ra khi kiểm tra tồn kho!');
        }
      },
      (error) => {
        this.showErrorMessage('Lỗi kết nối với máy chủ!');
      }
    );
  }

  // Cập nhật hàm check để không truyền DTO mà chỉ truyền đối tượng thông thường
  checkBillStatus(): Observable<any> {
    const bill = this.prepareBillData();  // Chuẩn bị dữ liệu thanh toán dưới dạng đối tượng

    // Gọi API check với đối tượng bill chuẩn bị từ giỏ hàng
    return this.http.post<any>('http://localhost:9090/bills/check', bill);
  }

  // Hàm chuẩn bị dữ liệu Bill từ giỏ hàng
  prepareBillData(): any {
    const bill = {
      productBill: this.listProduct.map((product) => ({
        product: {
          id: product.id,
        },
        quantity: product.quantity,
        price: product.price,
        size: product.size,
        color: product.color,
        createdAt: new Date().toISOString(),
        sales: product.sales || 0,
      })),
    };

    return bill;
  }

  showErrorMessage(message: string) {
    this.toastr.error(message, 'Lỗi!', {
      timeOut: 5000,  
    });
  }


}
