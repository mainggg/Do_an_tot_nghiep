import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment.cloud';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.css']
})
export class FavoriteProductComponent implements OnInit {

  constructor(private _router: Router,private _productService: UserService,) { }
  listProduct: any[] = []
  // parentId: number = this._routerActive.snapshot.params['id'];

  urlPreview: string = environment.api_end_point_preview;
  cartProductClass: string[] = [];

  dataItem: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  current: number = 1;
  pageSize: number = 10;
  total: number = 12;


  ngOnInit() {
      this.getAllProduct()
    for (let i = 0; i < this.listProduct.length; i++) {
      this.cartProductClass[i] = 'shopping-cart shopping-cart-none';
    }
  }

  async getAllProduct(){
    let dataRequest = {
      pageNumber: this.current - 1,
      pageSize: this.pageSize,
      filter: {
        category: {
          id: 8
        }
      },
      sortProperty: 'updatedAt',
      sortOrder: 'DESC'
    }
    await this._productService.getProduct(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        this.listProduct = res.data;
        this.total = res.dataCount;
      }
    })
  }

  shoppingCartHover($event: MouseEvent, index: any) {
    for (let i = 0; i < this.dataItem.length; i++) {
      this.cartProductClass[i] = 'shopping-cart shopping-cart-none';
    }
    this.cartProductClass[index] = 'shopping-cart shopping-cart-flex';
  }

  handleProductDetail(item: any) {
    this._router.navigate(['./home/product-detail/' + item.id])
  }

}
