import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardExpenseComponent } from './dashboard-expense/dashboard-expense.component';
import { DashboardRevenueComponent } from './dashboard-revenue/dashboard-revenue.component';
import { DashboardProfitComponent } from './dashboard-profit/dashboard-profit.component';
import { InformationBannerComponent } from './information-banner/information-banner.component';
import { InformationShopComponent } from './information-shop/information-shop.component';
import { InformationNewsComponent } from './information-news/information-news.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { CategoryParentComponent } from './category-parent/category-parent.component';
import { CategoryChildrenComponent } from './category-children/category-children.component';
import { ProductReadComponent } from './product-information/product-read/product-read.component';
import { ProductAddComponent } from './product-information/product-add/product-add.component';
import { AddNewsComponent } from './information-news/add-news/add-news.component';
import { ReadNewsComponent } from './information-news/read-news/read-news.component';
import { CollectionComponent } from './collection/collection.component';
import { UserComponent } from './user/user.component';
import { BillComponent } from './bill/bill.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../../services/auth.guard';
import { ColorConfigComponent } from './color-config/color-config.component';
import { SizeComponent } from './size/size.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    
    children: [
      {
        path: 'dashboard/expense',
        component: DashboardExpenseComponent,
      },
      {
        path: 'dashboard/revenue',
        component: DashboardRevenueComponent,
      },
      {
        path: 'dashboard/profit',
        component: DashboardProfitComponent,
      },
      {
        path: 'information/banner',
        component: InformationBannerComponent,
      },
      {
        path: 'information/shop',
        component: InformationShopComponent,
      },
      {
        path: 'information/news',
        component: InformationNewsComponent,
      },
      {
        path: 'information/news/add',
        component: AddNewsComponent,
      },
      {
        path: 'information/news/:action/:id',
        component: ReadNewsComponent,
      },
      {
        path: 'product/information',
        component: ProductInformationComponent,
      },
      {
        path: 'product/information/create',
        component: ProductAddComponent
      },
      {
        path: 'product/information/:action/:id',
        component: ProductReadComponent
      },
      {
        path: 'product/new',
        component: ProductNewComponent,
      },
      {
        path: 'category/parent',
        component: CategoryParentComponent,
      },
      {
        path: 'category/children',
        component: CategoryChildrenComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'bill',
        component: BillComponent,
      },
      {
        path: 'bill/detail/:id',
        component: BillDetailComponent,
      },
      {
        path: 'bill/detail/:id',
        component: BillDetailComponent,
      },
      {
        path: 'color',
        component: ColorConfigComponent,
      },
      {
        path: 'size',
        component: SizeComponent,
      },
      // {
      //   path: 'login',
      //   component: LoginComponent
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
