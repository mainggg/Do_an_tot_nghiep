import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { UserService } from '../user.service';
import { environment } from '../../../../environment/environment.cloud';
import { MessageService } from '../../../services/message.service';
import { LocalStorage } from '../../../services/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  
  constructor(private _router: Router,
    private _productService: UserService,
    private _activeRouter: ActivatedRoute,
    private _messageService: MessageService,
    private _localStorage: LocalStorage,
    private http: HttpClient
  ){}

  id: number = this._activeRouter.snapshot.params['id'];
  urlPreview: string = environment.api_end_point_preview;
  
  quantity = 1;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  product: any = {};

  arraySize: any[] = [];

  arrayClassSize: string[] = [];

  colorString = '';
  sizeString = '';
  size: string = '';
  color: string = '';

  spining = false;

  dataSaveCart: any = {};

  ngOnInit(): void {
    this.getDetail();
    for (let i = 0; i < this.arraySize.length; i++) {
      this.arrayClassSize[i] = '';
    }
  }


  clickSize(index: any) {
    for (let i = 0; i < this.arraySize.length; i++) {
      this.arrayClassSize[i] = '';
    }
    this.arrayClassSize[index] = 'is-size';
    this.size = this.product.productSize[index];
  }

  clickQuantity(operation: any) {
    if (operation === '+') {
      this.quantity++;
    } else if (operation === '-') {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }

  async getDetail(){
    this.spining = true;
    await this._productService.getProductDetail(this.id).then((res) => {
      if(res.result.responseCode == '00'){
        this.product = res.data;
        this.arraySize = res.data.productSize;
        this.colorAndSize();
      }
      this.spining = false;
    })
  }

  colorAndSize(){
    if(this.product.productSize.length > 0){
      for(let i = 0; i < this.product.productSize.length; i++){
        if(i == this.product.productSize.length - 1){
          this.sizeString += this.product.productSize[i];
        } else {
          this.sizeString += this.product.productSize[i] + ', ';
        }
      }
    }

    if(this.product.productColor.length > 0){
      this.color = this.product.productColor[0];
      for(let i = 0; i < this.product.productColor.length; i++){
        if(i == this.product.productSize.length - 1){
          this.colorString += this.product.productColor[i];
        } else {
          this.colorString += this.product.productColor[i] + ', ';
        }
      }
    }
  }
  checkVilidate = true;

  saveCart(){
    this.dataSaveCart.id = this.product.id;
    this.dataSaveCart.productName = this.product.productName;
    this.dataSaveCart.avatar = this.product.avatar;
    this.dataSaveCart.size = this.size;
    this.dataSaveCart.color = this.color;
    this.dataSaveCart.quantity = this.quantity;
    this.dataSaveCart.price = this.product.price;
    if(this.size === '' || this.color === ''){
      this._messageService.notificationWarning('Bạn phải chọn màu sắc và size');
      this.checkVilidate = false;
      return;
    }
    this.checkVilidate = true;
    this._localStorage.setShoppingCart(this.dataSaveCart);
    this.dataSaveCart = {};
  }

  navigatePayment() {
    // Gọi API check với dữ liệu giỏ hàng (sản phẩm, số lượng, giá)
    this.checkBillStatus().subscribe(
      (response: any) => {
        if (response.result.responseCode === '00') {
          // Nếu giỏ hàng hợp lệ, tiếp tục thanh toán
          this.saveCart();
          if (!this.checkVilidate) return; 
          this._router.navigate(['./home/payment']);
        } else {
          // Nếu có lỗi trong giỏ hàng, hiển thị thông báo lỗi
          this._messageService.notificationError(response.result.message || 'Có lỗi xảy ra khi thanh toán!');
        }
      },
      (error) => {
        // Hiển thị lỗi kết nối nếu không thể gọi API
        this._messageService.notificationError('Lỗi kết nối với máy chủ!');
      }
    );
  }

  // Hàm gọi API /bills/check (giả sử API yêu cầu các thông tin giỏ hàng trong một đối tượng)
  checkBillStatus(): Observable<any> {
    // Tạo đối tượng giỏ hàng theo thông tin của sản phẩm trong giỏ
    const bill = {
      productBill: this.product ? [{
        product: this.product,
        quantity: this.quantity,
        price: this.product.price,
        size: this.size,
        color: this.color,
        createdAt: new Date().toISOString(),
        sales: this.product.sales || 0,
      }] : []
    };

    // Gọi API check với dữ liệu giỏ hàng
    return this.http.post<any>('http://localhost:9090/bills/check', bill);
  }
}
