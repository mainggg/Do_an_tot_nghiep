import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Input() isCollapsed = false;

  constructor() {}

  access(listRole: string[]) {
    if (listRole === null) {
      return true;
    }
    return false;
    // return listRole.some((role: string) => {
    //   return this.checkRoleService.checkRole(role);
    // });
  }



  lstMenuRes?: any[] = [
    {
      name: 'Thống kê',
      url: null,
      classIcon: 'windows',
      role: null,
      lstChild: [
        {
          name: 'Chi phí',
          url: 'dashboard/expense',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Doanh thu',
          url: 'dashboard/revenue',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Lợi nhuận',
          url: 'dashboard/profit',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
    {
      name: 'Quản lý thông tin',
      url: null,
      classIcon: 'info-circle',
      role: null,
      lstChild: [
        {
          name: 'Banner',
          url: 'information/banner',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Cửa hàng',
          url: 'information/shop',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Tin tức',
          url: 'information/news',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
    {
      name: 'Quản lý sản phẩm',
      url: null,
      classIcon: 'shopping-cart',
      role: null,
      lstChild: [
        {
          name: 'Thông tin sản phẩm',
          url: 'product/information',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Nhập hàng',
          url: 'product/new',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Bộ sưu tập',
          url: 'collection',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
    {
      name: 'Quản lý danh mục',
      url: null,
      classIcon: 'appstore',
      role: null,
      lstChild: [
        {
          name: 'Danh mục sản phẩm cha',
          url: 'category/parent',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Danh mục sản phẩm con',
          url: 'category/children',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
    {
      name: 'Quản lý hóa đơn',
      url: 'bill',
      classIcon: 'file-done',
      role: null,
      lstChild: null,
    },
    {
      name: 'Quản lý tài khoản',
      url: 'user',
      classIcon: 'user',
      role: null,
      lstChild: [
        {
          name: 'Thông tin khách hàng',
          url: 'customer',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Thông tin người quản trị',
          url: 'user',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
    {
      name: 'Quản lý cấu hình',
      url: 'config',
      classIcon: 'setting',
      role: null,
      lstChild: [
        {
          name: 'Cấu hình màu',
          url: 'color',
          classIcon: null,
          role: null,
          lstChild: null,
        },
        {
          name: 'Cấu hình size',
          url: 'size',
          classIcon: null,
          role: null,
          lstChild: null,
        },
      ],
    },
  ];
}
