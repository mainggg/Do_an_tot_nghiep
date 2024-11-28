import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div style="text-align: center">
      <img style="width: 6vw" src="./assets/icons/no-result.svg" />
      <br />
      <span class="color-text">
        {{ 'message.no_data' | translate }}
      </span>
    </div>
  `,
  styles: [
    `
      .color-text {
        color: #667085;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 16px;
      }
    `,
  ],
})
export class NoDataComponent {}
