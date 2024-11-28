import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { LocalStorage } from '../../services/localstorage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carouselProduct') carouselProduct!: ElementRef;
  @ViewChild('firstHorizontalScrollDiv') firstHorizontalScrollDiv!: ElementRef;
  //@ViewChild('secondHorizontalScrollDiv') secondHorizontalScrollDiv: ElementRef;

  private storageSub: Subscription | undefined;

  @ViewChild('myOutlet', { static: true }) myOutlet!: RouterOutlet;

  arrDem: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  slideClass: string[] = [];

  listCate: any[] = [];

  lstCart: any[] = [];

  totalCart: number = 0;

  ngOnInit(): void {
    this.getAllCate();
    if(this._routerActive.snapshot.routeConfig?.path !== ''){
      this.isScroll = true;
    }
    this.getCountCart()

    this.storageSub = this._local.watchStorage().subscribe(() => {
      this.getCountCart()
    });

    
  }

  getCountCart(){
    this.totalCart = 0;
    const data = this._local.getShoppingCart();
    this.lstCart = data ? JSON.parse(data) : [];
    this.lstCart.map((item) => {
      this.totalCart += item.quantity;
    })
    
  }

  isScroll = false;

  closeMenu = false;

  openMenu(): void {
    this.closeMenu = !this.closeMenu;
  }

  handleLogo(){
    this._router.navigate(['./home/home-page']);
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }


  navigateMenu(router: any){
    this._router.navigate([router]);
    this.closeMenu = false;
    this.isScroll = true;
  }

  nextSlide() {
    const currentSlideIndex = this.slideClass.indexOf(
      'banner-slide banner-fade'
    );
    const nextSlideIndex = (currentSlideIndex + 1) % this.slideClass.length;
    this.slideClass[currentSlideIndex] = 'banner-slide';
    this.slideClass[nextSlideIndex] = 'banner-slide banner-fade';
  }
  

  constructor(private renderer: Renderer2, 
              private _homeService: UserService,
              private _router: Router,
              private _routerActive: ActivatedRoute,
            private _local: LocalStorage,
            ) {
              window.addEventListener('storage', (event) => {
                console.log(12)
                if (event.key == 'shoppingCart') {
                  console.log(12)
                  const data = this._local.getShoppingCart();
                  this.lstCart = data ? JSON.parse(data) : [];
                  this.totalCart = this.lstCart.length;
                }
              });
              }

  handleRoute(item: any){
    this._router.navigate(['./home/list-product/' + item.id])
    this.closeMenu = false;
    this.isScroll = true;
  }

  handleUser(){
    if(!localStorage.getItem('customerUserName')){
      this._router.navigate(['./home/login'])
    } else {
      this._router.navigate(['./home/information-account'])
    }
  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(this._routerActive.snapshot.routeConfig?.path != ''){
      this.isScroll = window.scrollY > 150;
    } else{
      this.isScroll = true;
    }

  }

  
  
  currentIndex = 0;
  interval: any;
  

  async getAllCate(){
    await this._homeService.getCategory().then((res) => {
      if(res.result.responseCode === '00'){
        this.listCate = res.data;
      }
    })
  }

  toShoppingCart(){
    this._router.navigate(['./home/shopping-cart']);
  }
}
