import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
    constructor(private _baseService: BaseService) {}
  
    //TODO QUẢN LÝ BANNER
    getBanner(dataRequest: any){
       return this._baseService.postData('banner', dataRequest);
    }
  
    //TODO GET COLLECTION
    getCollection(dataRequest: any){
        return this._baseService.postData('collection', dataRequest);
    }

    getCollectionDetail(id: any){
        return this._baseService.getData('collection/' + id);
    }

    //TODO GET PRODUCT
    getProduct(dataRequest: any){
        return this._baseService.postData('product', dataRequest);
    }

    getProductDetail(id: any){
        return this._baseService.getData('product/' + id);
    }


    //TODO GET CATEGORY
    getCategory(){
        return this._baseService.getData('category');
    }

    //TODO GET NEWS
    getNews(){
        return this._baseService.getData('news')
    }

    getNewsDetail(id: any){
        return this._baseService.getData('news/' + id);
    }

    //SAVE BILL
    saveBill(dataRequest: any){
        return this._baseService.postData('bills/create', dataRequest);
    }

    getExchangeRate(){
        return this._baseService.getDataV2('https://api.exchangerate-api.com/v4/latest/USD');
    }

    paypalReciver(moneyUSD: any){
        return this._baseService.getData('pay/' + moneyUSD)
    }

    //GET SHOP
    getListShop(dataRequest: any){
        return this._baseService.postData('shop', dataRequest);
    }

  }
  