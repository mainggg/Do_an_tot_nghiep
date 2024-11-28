import { Component } from '@angular/core';
import { HomeService } from '../../home.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-chi-tiet-tin-tuc',
  templateUrl: './chi-tiet-tin-tuc.component.html',
  styleUrl: './chi-tiet-tin-tuc.component.css'
})
export class ChiTietTinTucComponent {

  constructor (private _newsService: UserService,
    private _activeRoute: ActivatedRoute
  ){}

  id: number = this._activeRoute.snapshot.params['id'];
  data: any = {};

  ngOnInit(): void {
    this.getDetailNews();
  }

  async getDetailNews(){
    await this._newsService.getNewsDetail(this.id).then((item) => {
      if(item.result.responeCode == '00'){
          this.data = item.data;
      }
      this.data = item.data;
    })
  }

}
