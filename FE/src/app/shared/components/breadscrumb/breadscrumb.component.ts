import { Component, Input, SimpleChanges } from '@angular/core';
import { TransferDataService } from '../../../services/transfer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadscrumb',
  templateUrl: './breadscrumb.component.html',
  styleUrl: './breadscrumb.component.css',
})
export class BreadscrumbComponent {
  @Input() listBreadCrumb: any = [];
  @Input() positionTooltip = 'toolLeft';
  @Input() isHidden: boolean = false;

  lengthListBreadCrumb = 0;
  constructor(
    private _transferData: TransferDataService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.lengthListBreadCrumb = this.listBreadCrumb.length;
  }

  ngOnChanges(change: SimpleChanges) {
    this.lengthListBreadCrumb = change['listBreadCrumb'].currentValue.length;
  }

  currentItem: any = {};
  handleRouter(event: any) {
    this.currentItem = event;
    this.isVisibaleModalNavigate = true;
  }

  isVisibaleModalNavigate: any = false;

  onHandleCancelModalNavigate(event: any) {
    this.isVisibaleModalNavigate = false;
  }

  onHandleConfirmNavigate(event: any) {
    this._transferData.setIsCollapsed(false);
    this._router.navigate([`${this.currentItem.route}`]);
  }
}
