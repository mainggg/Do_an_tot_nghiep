import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search-text',
  templateUrl: './input-search-text.component.html',
  styleUrl: './input-search-text.component.css',
})
export class InputSearchTextComponent {
  @Input() value: any = null;
  @Output() handleSearchChange: EventEmitter<any> = new EventEmitter();
  @Output() handleClearChange: EventEmitter<any> = new EventEmitter();

  operator: number = 1;
  listOperators: any[] = [
    {
      label: 'equals',
      value: 1,
    },
    {
      label: 'contains',
      value: 2,
    },
  ];

  countHandle: number = 0;
  onHandleFilter($event: any) {
    if ($event.keyCode == 13 || $event.type == 'click') {
      this.countHandle++;
      this.handleSearchChange.emit({
        value: this.value ? this.value : null,
        operator: this.operator,
      });
    }
  }

  onHandleClearFilter() {
    this.value = null;
    if (this.countHandle > 0) this.handleClearChange.emit();
  }
}
