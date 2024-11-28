import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgZorroModuleExport } from '../../shared/modules/ng-zorro.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentCommonModule } from '../../shared/component-common.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from '../../setting/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddNewsComponent } from './information-news/add-news/add-news.component';
import { ReadNewsComponent } from './information-news/read-news/read-news.component';
import { CollectionComponent } from './collection/collection.component';
import { UserComponent } from './user/user.component';
import { BillComponent } from './bill/bill.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { ColorConfigComponent } from './color-config/color-config.component';
import { AddColorComponent } from './color-config/add-color/add-color.component';
import { ReadColorComponent } from './color-config/read-color/read-color.component';
import { SizeComponent } from './size/size.component';
import { AddSizeComponent } from './size/add-size/add-size.component';
import { ReadSizeComponent } from './size/read-size/read-size.component';

@NgModule({
  declarations: [
    DashboardExpenseComponent,
    AdminComponent,
    MenuComponent,
    DashboardExpenseComponent,
    DashboardRevenueComponent,
    DashboardProfitComponent,
    InformationBannerComponent,
    InformationShopComponent,
    InformationNewsComponent,
    ProductInformationComponent,
    ProductNewComponent,
    CategoryParentComponent,
    CategoryChildrenComponent,
    ProductReadComponent,
    ProductAddComponent,
    AddNewsComponent,
    ReadNewsComponent,
    CollectionComponent,
    UserComponent,
    BillComponent,
    BillDetailComponent,
    CustomerComponent,
    LoginComponent,
    ColorConfigComponent,
    AddColorComponent,
    ReadColorComponent,
    SizeComponent,
    AddSizeComponent,
    ReadSizeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroModuleExport,
    TranslateModule,
    ComponentCommonModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
})
export class AdminModule {}
