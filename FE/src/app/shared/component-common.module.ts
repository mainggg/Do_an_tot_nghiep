import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickActionComponent } from './components/quick-action/quick-action.component';
import { NgZorroModuleExport } from './modules/ng-zorro.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './components/button/button.component';
import { SafePipe } from './pipes/securityUrl.pipe';
import { ConvertMoneyPipe } from './pipes/pipe-convert-money.pipe';
import { NumberInputDirective } from './directives/number-input.directive';
import { NoDataComponent } from './components/no-data/no-data.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { VisibleColumnComponent } from './components/visible-column/visible-column.component';
import { SelectComponent } from './components/select/select.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ModalContentNoWarningComponent } from './components/modal-content-no-warning/modal-content-no-warning.component';
import { BreadscrumbComponent } from './components/breadscrumb/breadscrumb.component';
import { InputSearchTextComponent } from './components/input-search-text/input-search-text.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { AreaUploadComponent } from './components/area-upload/area-upload.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    SafePipe,
    ConvertMoneyPipe,
    NumberInputDirective,
    QuickActionComponent,
    ButtonComponent,
    NoDataComponent,
    PaginationComponent,
    VisibleColumnComponent,
    SelectComponent,
    SortIconComponent,
    ModalContentComponent,
    ModalContentNoWarningComponent,
    BreadscrumbComponent,
    InputSearchTextComponent,
    UploadFileComponent,
    ModalDeleteComponent,
    AreaUploadComponent,
    ModalConfirmComponent
  ],
  exports: [
    SafePipe,
    ConvertMoneyPipe,
    NumberInputDirective,
    QuickActionComponent,
    ButtonComponent,
    NoDataComponent,
    PaginationComponent,
    VisibleColumnComponent,
    SortIconComponent,
    SelectComponent,
    ModalContentComponent,
    ModalContentNoWarningComponent,
    BreadscrumbComponent,
    InputSearchTextComponent,
    UploadFileComponent,
    ModalDeleteComponent,
    AreaUploadComponent,
    ModalConfirmComponent,
  ],
  imports: [CommonModule, NgZorroModuleExport, TranslateModule, FormsModule],
})
export class ComponentCommonModule {}
