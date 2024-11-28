import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrl: './quick-action.component.css',
})
export class QuickActionComponent {
  @Input() action: string = '';
  @Input() hasRole: boolean = false;
  @Output() routerChange: EventEmitter<any> = new EventEmitter();
  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  showQuickAction: boolean = true;
  changeAction() {
    this.routerChange.emit(this.action);
  }
}
