import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visible-column',
  templateUrl: './visible-column.component.html',
  styleUrl: './visible-column.component.css',
})
export class VisibleColumnComponent {
  @Input() allChecked: boolean = false;
  @Input() indeterminate: boolean = true;
  @Input() listItem: any[] = [];
  @Output() itemListChange: any = new EventEmitter<any>();
  visible: boolean = false;
  constructor() {}

  ngOnInit() {}

  change(value: boolean): void {
    this.visible = false;
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    let checkedStatus = this.allChecked;
    this.listItem = this.listItem.map((item) => ({
      ...item,
      visible: checkedStatus,
    }));
    this.itemListChange.emit(this.listItem);
  }

  onClickCheckBox() {
    const allChecked = this.listItem.every((item) => item.visible);
    const noChecked = this.listItem.every((item) => !item.visible);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !noChecked;
    this.itemListChange.emit(this.listItem);
  }
}
