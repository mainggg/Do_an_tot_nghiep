import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environment/environment.cloud';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css'
})
export class CollectionDetailComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carouselWrapperLast') carouselWrapperLast!: ElementRef;
  @ViewChild('carouselProduct') carouselProduct!: ElementRef;
  isDragging = false;
  
  startX: number = 0;
  scrollLeft: number = 0;
  constructor(private _router: Router,
    private renderer: Renderer2,
    private activeRouter: ActivatedRoute,
    private _collectionService: UserService
  ) { }

  id = this.activeRouter.snapshot.params['id']
  listProduct: any[] = [];
  dataItem: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cartProductClass: string[] = [];
  urlPreview: string = environment.api_end_point_preview;

  datatInformation: any = {}

  cards = [
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
    {
      imageUrl:
        'https://aristino.com/Data/ResizeImage/images/banner/bst-2024/960x850-2x0x0x2.png',
      title: 'suits',
    },
  ];

  ngOnInit(): void {
    this.getDetail()
  }
  ngOnDestroy() {
    this.stopAutoSlide();
  }


  autoSlideInterval: any = '';
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.scrollBanner('right');
    }, 10000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  adjustCarouselWrapperWidthLast() {
    const firstImage =
      this.carouselProduct.nativeElement.querySelector('.img-last');
    firstImage.onload = () => {
      const imageWidth = firstImage.offsetWidth;
      console.log(imageWidth);

      this.renderer.setStyle(
        this.carouselWrapperLast.nativeElement,
        'width',
        `${imageWidth}px`
      );
    };

    if (firstImage.complete) {
      const imageWidth = firstImage.offsetWidth;
      this.renderer.setStyle(
        this.carouselWrapperLast.nativeElement,
        'width',
        `${imageWidth}px`
      );
    }
  }

  adjustCarouselProductWidth() {
    const firstImage =
      this.carouselProduct.nativeElement.querySelector('.img-last');
    firstImage.onload = () => {
      const imageWidth = firstImage.offsetWidth;
      const productWidth = 1688 - imageWidth - 30

      this.renderer.setStyle(
        this.carousel.nativeElement,
        'width',
        `${productWidth}px`
      );
    };

    if (firstImage.complete) {
      const imageWidth = firstImage.offsetWidth;
      const productWidth = 1200 - imageWidth - 30
      this.renderer.setStyle(
        this.carousel.nativeElement,
        'width',
        `${productWidth}px`
      );
    }
  }
 

  ngAfterViewInit() {
    this.startAutoSlide();
    this.adjustCarouselWrapperWidthLast();
    this.adjustCarouselProductWidth()
    // this.renderer.listen(this.carousel.nativeElement, 'mousedown', (event) =>
    //   this.startDragging(event)
    // );
    // this.renderer.listen(this.carousel.nativeElement, 'mouseup', (event) =>
    //   this.stopDragging(event)
    // );
    // this.renderer.listen(this.carousel.nativeElement, 'mouseleave', (event) =>
    //   this.stopDragging(event)
    // );
    // this.renderer.listen(this.carousel.nativeElement, 'mousemove', (event) =>
    //   this.onDrag(event)
    // );
  }

  // shoppingCartHover($event: MouseEvent, index: any) {
  //   for (let i = 0; i < this.dataItem.length; i++) {
  //     this.cartProductClass[i] = 'shopping-cart shopping-cart-none';
  //   }
  //   this.cartProductClass[index] = 'shopping-cart shopping-cart-flex';
  // }

  handleProductDetail(item: any) {
    this._router.navigate(['./home/product-detail/' + item.id]);
  }

  // startDragging(event: MouseEvent) {
  //   this.isDragging = true;
  //   this.startX = event.pageX - this.carousel.nativeElement.offsetLeft;
  //   this.scrollLeft = this.carousel.nativeElement.scrollLeft;
  //   this.renderer.addClass(this.carousel.nativeElement, 'dragging');
  // }

  // stopDragging(event: MouseEvent) {
  //   this.isDragging = false;
  //   this.renderer.removeClass(this.carousel.nativeElement, 'dragging');
  // }

  // onDrag(event: MouseEvent) {
  //   if (!this.isDragging) return;
  //   event.preventDefault();
  //   const x = event.pageX - this.carousel.nativeElement.offsetLeft;
  //   const walk = (x - this.startX) * 2;
  //   this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
  // }

  async getDetail() {
    await this._collectionService.getCollectionDetail(this.id).then((res) => {
      if (res.result.responseCode == '00') {
        this.datatInformation = res.data;

      }
    })
  }

  
  currentIndex = 0;
  interval: any;
  scrollProduct(direction: 'left' | 'right'): void {
    const carouselElement = this.carousel?.nativeElement;
    if (!carouselElement) return;

    const cardElement = carouselElement.querySelector('.card');
    if (!cardElement) return;

    const cardWidth = cardElement.clientWidth;
    const wrapperWidth = carouselElement.clientWidth;
    const totalCards = this.cards.length;
    const maxIndex = totalCards - Math.floor(wrapperWidth / cardWidth);

    if (direction === 'left') {
      this.currentIndex =
        this.currentIndex === 0 ? maxIndex : this.currentIndex - 1;
    } else {
      this.currentIndex =
        this.currentIndex === maxIndex ? 0 : this.currentIndex + 1;
    }

    carouselElement.scrollTo({
      left: this.currentIndex * cardWidth,
      behavior: 'smooth',
    });
  }

  scrollBanner(direction: 'left' | 'right'): void {
    const carouselElement = this.carouselProduct?.nativeElement;
    if (!carouselElement) return;

    const cardElement = carouselElement.querySelector('.card-product');
    if (!cardElement) return;

    const cardWidth = cardElement.clientWidth;
    const wrapperWidth = carouselElement.clientWidth;
    const totalCards = this.cards.length;
    const maxIndex = totalCards - Math.floor(wrapperWidth / cardWidth);

    if (direction === 'left') {
      this.currentIndex =
        this.currentIndex === 0 ? maxIndex : this.currentIndex - 1;
    } else {
      this.currentIndex =
        this.currentIndex === maxIndex ? 0 : this.currentIndex + 1;
    }

    carouselElement.scrollTo({
      left: this.currentIndex * cardWidth,
      behavior: 'smooth',
    });
  }

}
