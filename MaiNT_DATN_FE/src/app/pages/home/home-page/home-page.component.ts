import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UserService } from '../user.service';
import { filter } from 'rxjs';
import { environment } from '../../../../environment/environment.cloud';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carouselProduct') carouselProduct!: ElementRef;
  @ViewChild('firstHorizontalScrollDiv') firstHorizontalScrollDiv!: ElementRef;
  //@ViewChild('secondHorizontalScrollDiv') secondHorizontalScrollDiv: ElementRef;

  constructor(private _userService: UserService,
              private renderer: Renderer2,
              private _routerActive: ActivatedRoute,
              private _router: Router){

  }

  urlPreview: string = environment.api_end_point_preview;

  slideClass: any[] = [
  ];

  productSales: any[] = [];

  collection: any[] = [];

  ngOnInit(): void {
    if(this._routerActive.snapshot.routeConfig?.path != 'home-page'){
      this.isScrolled = true;
    }
    this.getAllProductSales();
    this.getBanner()
    this.getAllProductCollection();
    setInterval(() => {
      this.nextSlide();
    }, 10000); // Thay đổi ảnh sau mỗi 3 giây
  }

  // ngAfterViewInit() {
  //   this.startAutoplay();
  // }

  // ngOnDestroy() {
  //   this.stopAutoplay();
  // }

  // startAutoplay() {
  //   this.interval = setInterval(() => {
  //     this.scroll('right');
  //   }, 5000);
  // }

  // stopAutoplay() {
  //   clearInterval(this.interval);
  // }
  currentSlideIndex: number = 0;

  nextSlide() {
  
    //  this.slideClass.indexOf(
    //   'banner-slide banner-fade'
    // );
    for(let i = 0; i < this.slideClass.length; i++){
      if(this.slideClass[i].class == 'banner-slide banner-fade'){
        this.currentSlideIndex = i;
        break;
      }
    }
    let nextSlideIndex = this.currentSlideIndex + 1;
    if(nextSlideIndex >= this.slideClass.length){
      nextSlideIndex = 0;
    }
    this.slideClass[this.currentSlideIndex] = {
      urlImage: this.slideClass[this.currentSlideIndex].urlImage,
      class: 'banner-slide',
    };
    this.slideClass[nextSlideIndex] = {
      urlImage: this.slideClass[nextSlideIndex].urlImage,
      class: 'banner-slide banner-fade'
    };
  
  }

  async getBanner(){
    let dataRequest = {
      pageSize: 0,
      filter: {}
    }
    await this._userService.getBanner(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        for(let i = 0; i < res.data.length; i++){
          if(i == 0){
            let dataBanner = {
              class: 'banner-slide banner-fade',
              urlImage:  res.data[i].imageBanner
            }
            this.slideClass.push(dataBanner);
          } else {
            let dataBanner = {
              class: 'banner-slide',
              urlImage: res.data[i].imageBanner
            }
            this.slideClass.push(dataBanner);
          }
        }
      }
      
      
    })
  }

  async getAllProductSales(){
    let dataRequest = {
      pageSize: 0,
      filter: {},
      sortProperties: 'sortProperty',
      sortOrder: 'DESC'
    }
    await this._userService.getProduct(dataRequest).then((res) => {
      if(res.result.responseCode === '00'){
        this.productSales = res.data;
      }
    })
  }

  async getAllProductCollection(){
    let dataRequest = {
      pageSize: 0,
      filter: {},
      sortProperties: 'sortProperty',
      sortOrder: 'DESC'
    }
    await this._userService.getCollection(dataRequest).then((res) => {
      if(res.result.responseCode === '00'){
        this.collection = res.data;
      }
    })
  }



  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 100;
    // Thực hiện các hành động khi trang được cuộn
  
  }

  

  cards = [
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
    { imageUrl: 'assets/img/img2a.jpg', title: 'suits' },
  ];

  currentIndex = 0;
  interval: any;
  scroll(direction: 'left' | 'right'): void {
    const carouselElement = this.carousel?.nativeElement;
    const cardWidth = carouselElement?.querySelector('.card').clientWidth;
    const wrapperWidth = carouselElement?.clientWidth;
    const visibleCards = Math.floor(wrapperWidth / (cardWidth + 16));

    if (direction === 'left') {
      if (this.currentIndex === 0) {
        this.currentIndex = this.cards.length - visibleCards;
      } else {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
      }
    } else {
      if (this.currentIndex === this.cards.length - visibleCards) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Math.min(
          this.cards.length - visibleCards,
          this.currentIndex + 1
        );
      }
    }

    carouselElement?.scrollTo({
      left: this.currentIndex * (cardWidth + 16),
      behavior: 'smooth',
    });
  }

  scrollProduct(direction: 'left' | 'right'): void {
    const carouselElement = this.carouselProduct?.nativeElement;
    const cardWidth =
      carouselElement?.querySelector('.card-product').clientWidth;
    const wrapperWidth = carouselElement.clientWidth;
    const visibleCards = Math.floor(wrapperWidth / (cardWidth + 16));

    if (direction === 'left') {
      if (this.currentIndex === 0) {
        this.currentIndex = this.cards.length - visibleCards;
      } else {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
      }
    } else {
      if (this.currentIndex === this.cards.length - visibleCards) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Math.min(
          this.cards.length - visibleCards,
          this.currentIndex + 1
        );
      }
    }

    carouselElement?.scrollTo({
      left: this.currentIndex * (cardWidth + 16),
      behavior: 'smooth',
    });
  }

  handleProductDetail(item: any){
    this._router.navigate(['./home/product-detail/' + item.id])
  }

}
