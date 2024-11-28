import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from '../../../services/role.service';
import { UnitComponent } from '../../../pages/config/unit/unit.component';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input() type: string = '';
  @Input() model: any = '';
  @Input() value: any = '';
  @Input() width: any = 1200;
  @Input() selectCss: any = 'w-100';
  @Input() ngStyleCustom: any = {};
  @Input() label: any = '';
  @Input() disabled: boolean = false;
  @Input() hasBorderLess: boolean = false;
  @Input() mode: any = 'default'; //	'multiple' | 'tags' | 'default'
  @Input() listOption: any[] = [];
  @Input() allowAdd: boolean = true;
  @Input() listItemDisable: any[] = [];
  @Input() placeholder: string = 'message.select';
  @Input() typeModel: string = 'object';

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() addChange: EventEmitter<any> = new EventEmitter();
  open: boolean = false;
  labelClose: string = '';
  labelMessage: string = '';
  constructor(
    private _modalService: NzModalService,
    private _roleService: RoleService,
    private _translateService: TranslateService,
    private _messageService: MessageService
  ) {}

  getConfigLanguage() {
    this._translateService.get('button').subscribe((item) => {
      this.labelClose = item.close;
    });
    this._translateService.get('message').subscribe((item) => {
      this.labelMessage = item.no_config;
    });
  }

  openChange(event: any) {
    this.open = event;
  }

  ngOnInit() {
    this.getConfigLanguage();
  }

  returnCompareFn() {
    return this.compareFn;
  }

  checkRole(role: string) {
    return this._roleService.checkRole(role);
  }

  ngModelChange(event: any) {
    this.valueChange.emit(event);
  }

  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.id === o2.id : o1 === o2;

  handleAddNew() {
    let component: any = '';
    switch (this.type) {
      case 'unit': // <--- Ví dụ unit
        component = UnitComponent;
        break;

      default:
        component = '';
        this._messageService.notificationWarning(this.labelMessage);
        break;
    }

    if (component) {
      const modalRef = this._modalService.create({
        nzTitle: '',
        nzContent: component,
        nzWidth: this.width,
        nzMaskClosable: true,
        nzClosable: false,
        nzClassName: 'header-customer',
        nzOnCancel: () => {
          component = '';
          this.addChange.emit(true);
        },
        nzFooter: [
          {
            label: this.labelClose, // Đổi tên cho nút OK
            onClick: () => {
              component = '';
              modalRef.close();
              this.addChange.emit(true); // <--- Truyền sự kiện thay đổi
            },
          },
        ],
      });
    }
  }
}
