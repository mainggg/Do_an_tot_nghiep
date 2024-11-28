import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsSelectorRoutingModule } from './components-selector-routing.module';
import { ComponentsSelectorComponent } from './components-selector/components-selector.component';
import { ComponentCommonModule } from '../../shared/component-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroModuleExport } from '../../shared/modules/ng-zorro.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComponentsSelectorComponent],
  imports: [
    CommonModule,
    ComponentsSelectorRoutingModule,
    ComponentCommonModule,
    NgZorroModuleExport,
    TranslateModule,
    FormsModule,
  ],
})
export class ComponentsSelectorModule {}
