import { Component } from '@angular/core';
import { Chart } from '@antv/g2';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard-profit',
  templateUrl: './dashboard-profit.component.html',
  styleUrl: './dashboard-profit.component.css'
})
export class DashboardProfitComponent {

  constructor(private _profitService: AdminService) { }
  today = new Date();

  spin: boolean = false;
  title: string = "Thống kê lợi nhuận"
  dateMoth: Date = new Date();
  totalPrice: any = 0;
  totalPriceMoth: any = 0;

  listData: any[] = [];

  minChartValue = 0;

  dataCircle = [
  ];

  dataManyMonth: any[] = [];


  ngOnInit(): void {
    this.getTotalPrice();
    this.getListDataManyMonth();
  }




  async getTotalPrice() {
    await this._profitService.getProfitTotalPrice().then((res) => {
      if (res.result.responseCode == '00') {
        this.totalPrice = res.data;
      }
    })
  }


  async getListDataManyMonth() {
    await this._profitService.getProfitAll().then((item) => {
      if (item.result.responseCode == '00') {
        
        for(let itemData of item.data){
          let dataItem = {
            year: itemData.month + ' - ' + itemData.year,
            value: itemData.totalPrice
          }
          if(this.minChartValue > itemData.totalPrice) this.minChartValue = itemData.totalPrice;
          this.dataManyMonth.push(dataItem);
        }
        
        this.createChartManyMonth();
      }
    })
  }



  chartManyMonth: any = null;
  createChartManyMonth(){
    if(this.chartManyMonth != null){
      this.chartManyMonth.destroy()
    }
    this.chartManyMonth = new Chart({
      container: 'container-man-month',
      autoFit: true,
      height: 700,
    });
    
    this.chartManyMonth.data(this.dataManyMonth);
    this.chartManyMonth.scale({
      year: {
        range: [0, 1],
      },
      value: {
        min: this.minChartValue,
        nice: true,
      },
    });
    
    this.chartManyMonth.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });
    
    this.chartManyMonth.line().position('year*value').label('value');
    this.chartManyMonth.point().position('year*value');
    
    this.chartManyMonth.render();
  }

}
