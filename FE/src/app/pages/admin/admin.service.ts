import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _baseService: BaseService) {}

  // TODO: QUẢN LÝ DANH MỤC
  getListCategory(dataRequest: any) {
    return this._baseService.postData(`admin/category`, dataRequest);
  }

  saveCategory(dataRequest: any){
    return this._baseService.postData(`admin/category/save`, dataRequest);
  }

  updateCategory(id: any, dataRequest: any){
    return this._baseService.putData(`admin/category/update/${id}`, dataRequest);
  }

  deleteCategory(id: any){
    return this._baseService.deleteData(`admin/category/delete/${id}`);
  }

  // TODO: QUẢN LÝ DANH MỤC CHA
  getListCategoryParent(dataRequest: any) {
    return this._baseService.postData(`admin/category/parent`, dataRequest);
  }


  //TODO: QUẢN LÝ BANNER
  getListBanner(dataRequest: any){
    return this._baseService.postData(`admin/banner`, dataRequest);
  }

  saveBanner(dataRequest: any){
    return this._baseService.postData(`admin/banner/save`, dataRequest);
  }

  changeBanner(id: any){
    return this._baseService.getData(`admin/banner/${id}/change`)
  }

  deleteBanner(id: any){
    return this._baseService.deleteData(`admin/banner/delete/${id}`)
  }


  //TODO: QUẢN LÝ SHOP
  getListShop(dataRequest: any){
    return this._baseService.postData('admin/shop', dataRequest)
  }

  saveShop(dataRequest: any){
    return this._baseService.postData('admin/shop/save', dataRequest)
  }

  updateShop(dataRequest: any){
    return this._baseService.putData('admin/shop/update', dataRequest);
  }

  deleteShop(id: any){
    return this._baseService.deleteData(`admin/shop/delete/${id}`)
  }

  //TODO: QUẢN LÝ MÀU SẮC
  getListColor(dataRequest: any){
    return this._baseService.postData('admin/color', dataRequest)
  }

  saveColor(dataRequest: any){
    return this._baseService.postData('admin/color/save', dataRequest);
  }

  updateColor(dataRequest: any){
    return this._baseService.postData('admin/color/update', dataRequest);
  }

  deleteColor(id: any){
    return this._baseService.deleteData('admin/color/delete/' + id);
  }


  //TODO: QUẢN LÝ SIZE
  getListSize(dataRequest: any){
    return this._baseService.postData('admin/size', dataRequest)
  }

  saveSize(dataRequest: any){
    return this._baseService.postData('admin/size/save', dataRequest);
  }

  updateSize(dataRequest: any){
    return this._baseService.postData('admin/size/update', dataRequest);
  }

  deleteSize(id: any){
    return this._baseService.deleteData('admin/size/delete/' + id);
  }


  //TODO: QUẢN LÝ SẢN PHẨM
  getListProduct(dataRequest: any){
    return this._baseService.postData('admin/product', dataRequest);
  }

  getProduct(id: any){
    return this._baseService.getData('admin/product/' + id);
  }

  saveProduct(dataRequest: any){
    return this._baseService.postData('admin/product/save', dataRequest);
  }

  updateProduct(id: any, dataRequest: any){
    return this._baseService.putData('admin/product/update/' + id, dataRequest);
  }

  delete(id: any){
    return this._baseService.deleteData('admin/product/delete/' + id);
  }


  //TODO PRODUCT NEW
  getListProductNew(dataRequest: any){
    return this._baseService.postData('admin/product-import', dataRequest)
  }

  saveProductImport(dateRequest: any){
    return this._baseService.postData('admin/product-import/save', dateRequest);
  }

  updateProductImport(id: any, dataRequest: any){
    return this._baseService.putData('admin/product-import/update/' + id, dataRequest)
  }

  deleteProductImpory(id: any){
    return this._baseService.deleteData('admin/product-import/delete/' + id);
  }

  //TODO QUẢN LÝ TIN TỨC
  getListNews(dataRequest: any){
    return this._baseService.postData('admin/news', dataRequest);
  }

  getNews(id: any){
    return this._baseService.getData('admin/news/' + id);
  }

  saveNews(dataRequest: any){
    return this._baseService.postData('admin/news/save', dataRequest);
  }

  updateNews(id: any, dataRequest: any){
    return this._baseService.putData('admin/news/update/' + id, dataRequest);
  }

  deleteNews(id: any){
    return this._baseService.deleteData('admin/news/delete/' + id);
  }

  changeNewsVisible(id: any){
    return this._baseService.getData('admin/news/' +id +'/change-visible')
  }

  //QUẢN LÝ BỘ SƯU TẬP
  getListCollection(dataRequest: any){
    return this._baseService.postData('admin/collection', dataRequest);
  }

  saveCollection(dataRequest: any){
    return this._baseService.postData("admin/collection/save", dataRequest);
  }

  updateCollection(id: any, dataRequest: any){
    return this._baseService.putData("admin/collection/update/" + id, dataRequest);
  }

  deleteCollection(id: any){
    return this._baseService.deleteData("admin/collection/" + id);
  }

  //GET BILL
  getAllBill(dataRequest: any){
    return this._baseService.postData('admin/bills', dataRequest)
  }

  getDetailBill(id: any){
    return this._baseService.getData("bills/" + id)
  }

  changeStatus(id: any, status: any){
    return this._baseService.getData('bills/' + id +'/change/' + status)
  }

  //TODO GET ADMIN
  getAllUserAdmin(dataRequest: any){
    return this._baseService.postData('admin/user', dataRequest)
  }

  getAllRole(){
    return this._baseService.getData('admin/roles');
  }

  getUserDetail(userName: any){
    return this._baseService.getData('user/' + userName);
  }

  saveUser(dataRequest: any){
    return this._baseService.postData('user/new', dataRequest);
  }

  updatedUser(id: any ,dataRequest: any){
    return this._baseService.putData('user/' + id, dataRequest);
  }

  deleteUser(id: any){
    return this._baseService.deleteData('admin/delete/' + id);
  }

  changePassword(id: any, dataRequest: any){
    return this._baseService.postData("admin/change-password/" + id, dataRequest);
  }

  getAllCustomer(dataRequest: any){
    return this._baseService.postData('user', dataRequest);
  }

  //TODO DOANH THU
  getListRevenueQuantity(){
    return this._baseService.getData('admin/revenue/product');
  }

  getTotalPrice(){
    return this._baseService.getData('admin/total-price')
  }

  getTotalPriceMothYear(month: any, year: any){
    return this._baseService.getData('admin/total-price/' + month + '/' + year);
  }

  getRevenueByMonth(month: any, year: any){
    return this._baseService.getData('admin/revenue/' + month + '/' + year);
  }

  getRevenueForManyMonth(){
    return this._baseService.getData('admin/revenue/many-month');
  }


  //TODO CHI PHÍ

  getExpensiveTotalPrice(){
    return this._baseService.getData('admin/expensive/total-price')
  }

  getExpensiveTotalPriceMothYear(month: any, year: any){
    return this._baseService.getData('admin/expensive/total-price/' + month + '/' + year);
  }

  getExpensiveRevenueByMonth(month: any, year: any){
    return this._baseService.getData('admin/expensive/' + month + '/' + year);
  }

  getExpensiveForManyMonth(){
    return this._baseService.getData('admin/expensive/many-month');
  }

  //TODO LỢI NHUẬN
  getProfitTotalPrice(){
    return this._baseService.getData('admin/profit/total-price')
  }

  getProfitAll(){
    return this._baseService.getData('admin/all-profit')
  }


  //LOGIN
  loginAdmin(dataRequest: any){
    return this._baseService.postData('login', dataRequest)
  }

  getRoleByUser(userName: any){
    return this._baseService.getData('admin/' + userName + '/roles')
  }

  //NOTIFICATION
  getNotification(){
    return this._baseService.getData('admin/notification');
  }

  getCountNotification(){
    return this._baseService.getData('admin/notification/count');
  }




}
