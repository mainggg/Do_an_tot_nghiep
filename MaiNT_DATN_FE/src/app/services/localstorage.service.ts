import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class LocalStorage{

    private storageSub = new Subject<void>();

  constructor() {
    window.addEventListener('storage', () => {
      this.storageSub.next();
    });
  }

  watchStorage(): Observable<void> {
    return this.storageSub.asObservable();
  }

    listDataProduct: any[] = [];

    keyCard: any = "shoppingCart";

    setShoppingCart(dataInput: any){
        if(localStorage.getItem(this.keyCard) !== undefined || localStorage.getItem(this.keyCard) !== null){
            const data = localStorage.getItem(this.keyCard);
            this.listDataProduct = data ? JSON.parse(data) : [];
            localStorage.removeItem(this.keyCard)
        }
        let check = true;
        for(let i = 0; i < this.listDataProduct.length; i++){
            if(this.listDataProduct[i].id == dataInput.id && this.listDataProduct[i].color == dataInput.color && this.listDataProduct[i].size == dataInput.size){
                this.listDataProduct[i].quantity = this.listDataProduct[i].quantity + dataInput.quantity;
                check = false;
            }
        }
        if(check){
            this.listDataProduct.push(dataInput);
        }
        localStorage.setItem(this.keyCard, JSON.stringify(this.listDataProduct));
        this.storageSub.next()
    }

    removeShoppingCart(dataInput: any){
        if(localStorage.getItem(this.keyCard) !== undefined || localStorage.getItem(this.keyCard) !== null){
            const data = localStorage.getItem(this.keyCard);
            this.listDataProduct = data ? JSON.parse(data) : [];
            localStorage.removeItem(this.keyCard)
        }
        
        this.listDataProduct = this.listDataProduct.filter(item => (item.id !== dataInput.id || item.color !== dataInput.color || item.size !== dataInput.size))
        // for(let i = 0; i < this.listDataProduct.length; i++){
        //     if(this.listDataProduct[i].id == dataInput.id && this.listDataProduct[i].color == dataInput.color && this.listDataProduct[i].size == dataInput.size){
        //         this.listDataProduct[i].removeItem(this.listDataProduct[i]);
        //     }
        // }
        
        localStorage.setItem(this.keyCard, JSON.stringify(this.listDataProduct));
        this.storageSub.next()
    }

    getShoppingCart(){
        return localStorage.getItem(this.keyCard);
    }

    removeAllShoppingCart(){
        localStorage.removeItem(this.keyCard);
        this.storageSub.next()
    }

}
