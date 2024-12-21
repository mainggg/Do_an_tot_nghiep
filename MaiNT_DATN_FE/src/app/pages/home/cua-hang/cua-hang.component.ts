import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { UserService } from '../user.service';
import moment from 'moment';

@Component({
  selector: 'app-cua-hang',
  templateUrl: './cua-hang.component.html',
  styleUrl: './cua-hang.component.css'
})
export class CuaHangComponent implements OnInit{

  constructor (private _shopService: UserService){

  }

  listShop: any[] = [];
  shopName: any = '';
  total: number = 0;

  ngOnInit(): void{
    this.getAllShop();
  }

  searchShop(){
    this.getAllShop();
  }


  async getAllShop(){
    console.log(this.shopName)
    let dataRequest = {
      pageNumber: 0,
      pageSize: 0,
      filter: {
        shopName: this.shopName,
      },
      sortProperty:"updatedAt",
      sortOrder: "DESC",
    };
    await this._shopService.getListShop(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        this.listShop = res.data;
        this.total = res.dataCount
      }
    })
  }




}
