import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { environment } from '../../../../environment/environment.cloud';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {

  constructor(private _collectionService: UserService,
    private _router: Router,
    private _routerActive: ActivatedRoute
  ) {}


  listCollection: any[] = []
  parentId: number = this._routerActive.snapshot.params['id'];

  urlPreview: string = environment.api_end_point_preview;
  cartProductClass: string[] = [];

  dataItem: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  current: number = 1;
  pageSize: number = 10;
  total: number = 12;

  ngOnInit(): void {
    this._routerActive.paramMap.subscribe(params => {
      this.parentId = this._routerActive.snapshot.params['id'];
      this.getAllCollection()
    });
  }

  async getAllCollection(){
    let dataRequest = {
      pageNumber: this.current - 1,
      pageSize: this.pageSize,
      filter: {
        category: {
          id: this.parentId
        }
      },
      sortProperty: 'updatedAt',
      sortOrder: 'DESC'
    }
    await this._collectionService.getCollection(dataRequest).then((res) => {
      if(res.result.responseCode == '00'){
        this.listCollection = res.data;
        this.total = res.dataCount;
      }
    })
  }

  handleProductDetail(item: any){
    this._router.navigate(['./home/collection/detail/' + item.id])
  }

}
