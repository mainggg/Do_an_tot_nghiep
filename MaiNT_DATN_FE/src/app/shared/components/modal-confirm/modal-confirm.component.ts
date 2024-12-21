import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() isShowModal: boolean = false;
  @Input() widthModal: number = 600;
  @Input() titleModal: string = '';
  @Input() titleBtnPrimary: string = 'button.confirm';
  @Input() titleBtnCancel: string = 'button.cancel';
  @Input() contentModal: string = '';
  @Input() headerContent: string = '';
  @Input() warningContent: string = 'modal.hintWarning';
  @Output() isConfirmDelete: EventEmitter<boolean> = new EventEmitter();
  @Output() isCancelDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onHandleCancelModal() {
    this.isCancelDelete.emit(false);
    this.isShowModal = false;
  }

  onHandleConfirmModal() {
    this.isCancelDelete.emit(false);
    this.isConfirmDelete.emit(true);
    this.isShowModal = false;
  }
}
