import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgZorroModuleExport } from '../../shared/modules/ng-zorro.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentCommonModule } from '../../shared/component-common.module';
import { HomePageComponent } from './home-page/home-page.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ListProductComponent } from './list-product/list-product.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GioHangComponent } from './gio-hang/gio-hang.component';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';
import { ChiTietTinTucComponent } from './tin-tuc/chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { LoginComponent } from './login/login.component';
import { CuaHangComponent } from './cua-hang/cua-hang.component';
import { AccoutingComponent } from './accouting/accouting.component';
import { BillComponent } from '../home/bill/bill.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionDetailComponent } from './collection/collection-detail/collection-detail.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    PaymentComponent,
    ListProductComponent,
    ProductDetailComponent,
    GioHangComponent,
    TinTucComponent,
    ChiTietTinTucComponent,
    LoginComponent,
    CuaHangComponent,
    AccoutingComponent,
    BillComponent,
    PaymentSuccessComponent,
    CollectionComponent,
    CollectionDetailComponent,
    FavoriteProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroModuleExport,
    TranslateModule,
    NzFormModule,
    NzPaginationModule,
    FormsModule,
    NzCarouselModule,
    ComponentCommonModule,
    NzBreadCrumbModule,
  ],
  providers: [DecimalPipe]
})
export class HomeModule {}
