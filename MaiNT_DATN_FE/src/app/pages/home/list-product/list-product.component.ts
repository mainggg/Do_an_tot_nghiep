import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../../environment/environment.cloud';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  constructor(private _productService: UserService,
    private _router: Router,
    private _routerActive: ActivatedRoute
  ) {}


  listProduct: any[] = []
  parentId: number = this._routerActive.snapshot.params['id'];

  urlPreview: string = environment.api_end_point_preview;
  cartProductClass: string[] = [];

  dataItem: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  current: number = 1;
  pageSize: number = 10;
  total: number = 12;

  ngOnInit(): void {
    this._routerActive.paramMap.subscribe(params => {
      this.parentId = this._routerActive.snapshot.params['id'];
      this.getAllProduct()
    });
    for (let i = 0; i < this.listProduct.length; i++) {
      this.cartProductClass[i] = 'shopping-cart shopping-cart-none';
    }
  }

  shoppingCartHover($event: MouseEvent, index: any) {
    for (let i = 0; i < this.dataItem.length; i++) {
      this.cartProductClass[i] = 'shopping-cart shopping-cart-none';
    }
    this.cartProductClass[index] = 'shopping-cart shopping-cart-flex';
  }

  async getAllProduct(){
    let dataRequest = {
      pageNumber: this.current - 1,
      pageSize: this.pageSize,
      filter: {
        category: {
          id: this.parentId
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

  handleProductDetail(item: any){
    this._router.navigate(['./home/product-detail/' + item.id])
  }

}
