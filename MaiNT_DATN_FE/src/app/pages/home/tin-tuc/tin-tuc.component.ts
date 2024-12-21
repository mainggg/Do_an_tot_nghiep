import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { environment } from '../../../../environment/environment.cloud';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css']
})
export class TinTucComponent {

  constructor(private _newsService: UserService, private _router: Router) { }

  listNew: any[] = [];

  urlPreview: string = environment.api_end_point_preview;
  current = 1;
  total = 12
  pageSize = 12

  ngOnInit(): void {
    this.getDataNews();
  }

  async getDataNews(){
    await this._newsService.getNews().then((item) => {
      if(item.result.responseCode == '00'){
        this.listNew = item.data;
        console.log(this.listNew);
      }
    })
  }

  getFileDisplayName(name: string, limit: number): string {
    
    if (name?.length <= limit) {
      return name;
    } else {
      return name?.substring(0, limit) + '...';
    }
  }

  naviateDetail(id: any){
    this._router.navigate(['./home/new/detail/' + id])
  }

}
