import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() btnType: NzButtonType = 'primary';
  @Input() btnTitle: string = '';
  @Input() btnIconType: string = '';
  @Input() btnIconTheme: any = 'outline';
  @Input() btnTooltip: string = '';
  @Input() linkSvg: string = '';
  @Input() btnClass: string = '';
  @Input() btnDisabled: boolean = false;
  @Input() nzDanger: boolean = false;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  onHandleClick() {
    this.btnClick.emit();
  }

  customerIcon() {
    let customeCssIcon = '';
    if (this.btnType == 'primary' && this.btnTitle) {
      customeCssIcon = 'color: #fff';
    } else if (this.btnType == 'primary' && !this.btnTitle) {
      customeCssIcon = 'color: #fff';
    } else {
      if (this.btnDisabled) {
        customeCssIcon = 'color: #244a6433';
      } else {
        customeCssIcon = 'color: #244A64';
      }
    }
    return customeCssIcon;
  }

  customerButton() {
    let customeCss = '';
    if (this.btnType == 'primary' || this.btnType == 'link') {
      if (this.linkSvg || this.btnIconType) {
        customeCss = 'padding-left: 8px;';
      } else {
        customeCss = '';
      }
    }
    if (
      this.btnType == 'text' ||
      this.btnType == 'default' ||
      this.btnType == 'dashed'
    ) {
      if (this.linkSvg || this.btnIconType) {
        customeCss = 'padding-left: 8px; color: #244A64';
      } else {
        customeCss = 'color: #244A64';
      }
    }
    return customeCss;
  }

  ngOnInit() {}
}
