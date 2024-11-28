import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrl: './sort-icon.component.css',
})
export class SortIconComponent {
  @Input() column: any = {};
  @Output() sortChange: EventEmitter<any> = new EventEmitter();

  customSortFunction(sortOrder: string) {
    this.sortChange.emit(sortOrder);
  }
}
