import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css',
})
export class ModalContentComponent {
  @Input() show: boolean = false;
  @Input() width: number = 600;
  @Input() titleBtnConfirm: string = 'button.confirm';
  @Input() titleBtnCancel: string = 'button.cancel';
  @Input() title: string = '';
  @Input() header: string = '';
  @Input() content: string = '';
  @Input() warning: string = 'message.note';
  @Output() confirmChange: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelChange: EventEmitter<boolean> = new EventEmitter();

  onHandleCancel() {
    this.cancelChange.emit(false);
    this.show = false;
  }

  onHandleConfirm() {
    this.cancelChange.emit(false);
    this.confirmChange.emit(true);
    this.show = false;
  }
}
