import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagination',
  template: `
    <div
      nz-row
      nzJustify="space-between"
      nzGutter="24"
      nzAlign="top"
      class="mt-12"
    >
      <div nz-col>
        <nz-select
          [(ngModel)]="perPage"
          (ngModelChange)="changeSize()"
          [nzShowArrow]="true"
          [nzDropdownMatchSelectWidth]="false"
        >
          <nz-option
            [nzValue]="10"
            nzLabel="10 / {{ 'pagination.page' | translate }}"
          ></nz-option>
          <nz-option
            [nzValue]="20"
            nzLabel="20 / {{ 'pagination.page' | translate }}"
          ></nz-option>
          <nz-option
            [nzValue]="30"
            nzLabel="30 / {{ 'pagination.page' | translate }}"
          ></nz-option>
        </nz-select>
      </div>
      <div nz-col>
        <div nz-row nzJustify="center">
          <nz-pagination
            [(nzPageIndex)]="page"
            [nzTotal]="total"
            [nzShowQuickJumper]="false"
            [nzSize]="'small'"
            [(nzPageSize)]="perPage ? perPage : total"
            [nzResponsive]="false"
            [nzShowSizeChanger]="false"
            (nzPageIndexChange)="changeIndex()"
            (nzPageSizeChange)="changeSize()"
            [nzShowTotal]="rangeTemplate"
          ></nz-pagination>

          <ng-template #rangeTemplate let-range="range" let-total>
            {{ 'pagination.show' | translate }} {{ page }}
            {{ 'pagination.total' | translate }} {{ totalPage }} ( {{ total }}
            {{ 'pagination.record' | translate }} )
          </ng-template>
        </div>
      </div>
      <div nz-col>
        <nz-row nzJustify="end" nzAlign="middle">
          <div class="mr-8">
            {{ 'pagination.page.goto' | translate }} &nbsp;
          </div>
          <div>
            <input
              style="width: 60px"
              type="number"
              nz-input
              [value]="page"
              (keyup)="changePage($event)"
            />
          </div>
        </nz-row>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  constructor(
    private toast: ToastrService,
    private _translateService: TranslateService
  ) {
    this._translateService.get(`pagination`).subscribe((item) => {
      this.minValid = item.min;
      this.maxValid = item.max;
    });
  }
  @Input() total: number = 0;
  @Output() emitPage: EventEmitter<any> = new EventEmitter();
  @Input() page = 1;
  @Input() perPage = 10;
  pageSize: any;
  totalPage: number = 0;
  minValid: string = '';
  maxValid: string = '';
  getPage(page: number) {
    this.page = page;
  }
  getSize(size: number) {
    this.perPage = size;
  }
  changeIndex() {
    this.totalPage = this.perPage ? Math.ceil(this.total / this.perPage) : 1;
    this.emitPage.emit({ page: this.page, size: this.perPage });
  }
  changeSize() {
    this.totalPage = this.perPage ? Math.ceil(this.total / this.perPage) : 1;
    this.emitPage.emit({ page: this.page, size: this.perPage });
  }
  changePage($event: any) {
    let page = this.page;
    if ($event.keyCode == 13) {
      this.page = $event.target.value;

      if (this.page < 1) {
        this.toast.warning(this.minValid);
        this.page = page;
      } else if (this.page > this.totalPage) {
        this.toast.warning(this.maxValid + this.totalPage);
        this.page = page;
      } else {
        this.emitPage.emit({ page: this.page, size: this.perPage });
      }
    }
  }
  ngOnInit(): void {
    // this.emitPage.emit({ page: this.page, size: this.perPage });
    this.totalPage = this.perPage ? Math.ceil(this.total / this.perPage) : 1;
  }
  ngOnChanges(changes: any): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.totalPage = this.perPage ? Math.ceil(this.total / this.perPage) : 1;
  }
}
