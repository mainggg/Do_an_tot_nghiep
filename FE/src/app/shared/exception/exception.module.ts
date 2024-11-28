import { NgModule } from '@angular/core';

import { ExceptionRoutingModule } from './exception-routing.module';

import { Exception403Component } from './403.component';
import { Exception404Component } from './404.component';
import { Exception500Component } from './500.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [ExceptionRoutingModule, NzButtonModule, TranslateModule],
  declarations: [
    Exception403Component,
    Exception404Component,
    Exception500Component
  ],
})
export class ExceptionModule {}
