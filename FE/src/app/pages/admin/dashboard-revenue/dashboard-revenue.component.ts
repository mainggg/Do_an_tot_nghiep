import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { AdminService } from '../admin.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { months } from 'moment';

@Component({
  selector: 'app-dashboard-revenue',
  templateUrl: './dashboard-revenue.component.html',
  styleUrl: './dashboard-revenue.component.css'
})
export class DashboardRevenueComponent implements OnInit {


  constructor(private _revenueService: AdminService) { }
  today = new Date();
  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;

  spin: boolean = false;
  title: string = "Thống kê doanh thu"
  dateMoth: Date = new Date();
  totalPrice: any = 0;
  totalPriceMoth: any = 0;

  listData: any[] = [];

  dataCircle = [
  ];

  dataManyMonth: any[] = [];


  ngOnInit(): void {
    this.getListData();
    this.getTotalPrice();
    this.getTotalPriceMonth();
    this.getRevenueByMonth();
    this.getListDataManyMonth();
  }


  async getListData() {
    await this._revenueService.getListRevenueQuantity().then((item) => {
      if (item.result.responseCode == '00') {
        this.listData = item.data;
        this.createChart();
      }
    })
  }

  async getTotalPrice() {
    await this._revenueService.getTotalPrice().then((res) => {
      if (res.result.responseCode == '00') {
        this.totalPrice = res.data;
      }
    })
  }

  async getTotalPriceMonth() {
    await this._revenueService.getTotalPriceMothYear(this.dateMoth.getMonth() + 1, this.dateMoth.getFullYear()).then((res) => {
      if (res.result.responseCode == '00') {
        this.totalPriceMoth = res.data ? res.data : 0;
      }
    })
  }

  async getListDataManyMonth() {
    await this._revenueService.getRevenueForManyMonth().then((item) => {
      if (item.result.responseCode == '00') {
        
        for(let itemData of item.data){
          let dataItem = {
            year: itemData.dateSell.split('-')[1] + ' - ' + itemData.dateSell.split('-')[2],
            value: itemData.totalPrice
          }
          this.dataManyMonth.push(dataItem);
        }
        console.log(this.dataManyMonth)
        this.createChartManyMonth();
      }
    })
  }

  async getRevenueByMonth() {
    await this._revenueService.getRevenueByMonth(this.dateMoth.getMonth() + 1, this.dateMoth.getFullYear()).then((res) => {
      if (res.result.responseCode == '00') {
        this.dataCircle = res.data ? res.data : [];
        this.createdChartRevenue();
      }
    })
  }

  changeDate() {
    this.getListData();
    this.getTotalPrice();
    this.getTotalPriceMonth();
    this.getRevenueByMonth()
  }

  chartRevenue: any = null;
  createdChartRevenue() {
    if (this.chartRevenue != null) {
      this.chartRevenue.destroy();
    }
    this.chartRevenue = new Chart({
      container: 'container-revenue',
      autoFit: true,
      height: 500,
    });

    this.chartRevenue.coordinate('theta', {
      radius: 0.75,
    });

    this.chartRevenue.data(this.dataCircle);

    this.chartRevenue.scale('percent', {
      formatter: (val: any) => {
        val = val * 100 + '%';
        return val;
      },
    });

    this.chartRevenue.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    this.chartRevenue
      .interval()
      .position('totalPrice')
      .color('productName')
      .label('percent', {
        layout: [{ type: 'limit-in-plot', cfg: { action: 'ellipsis'/** 或 translate */ } }],
        content: (data: any) => {
          return `${data['percent'] * 100}%`;
        },
      })
      .adjust('stack');

    this.chartRevenue.interaction('element-active');

    this.chartRevenue.render();
  }

  chart: any = null;
  createChart(): void {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 700,
    });
    this.chart.data(this.listData);
    this.chart
      .coordinate()
      .transpose()
      .scale(1, -1);

    this.chart.axis('quantity', {
      position: 'right',
    });
    this.chart.axis('dateSell', {
      label: {
        offset: 12,
      },
    });

    this.chart.tooltip({
      shared: true,
      showMarkers: false,
    });

    this.chart
      .interval()
      .position('dateSell*quantity')
      .color('productName')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);

    this.chart.interaction('active-region');

    this.chart.render();

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
        min: 0,
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
