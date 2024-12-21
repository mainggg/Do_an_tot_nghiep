import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  @Input() isShowModal: boolean = false;
  @Input() widthModal: number = 600;
  @Input() titleModal: string = '';
  @Input() contentModal: string = '';
  @Output() isConfirmDelete: EventEmitter<boolean> = new EventEmitter();
  @Output() isCancelDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

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
