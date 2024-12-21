import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { NgZorroModuleExport } from './shared/modules/ng-zorro.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentCommonModule } from './shared/component-common.module';
// import { KeycloakAngularModule } from 'keycloak-angular';
import { ToastrModule } from 'ngx-toastr';
import { ExceptionModule } from './shared/exception/exception.module';
import { DefaultInterceptor } from './services/default.interceptor';
import { LoginService } from './services/login.service';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(en);

const INTERCEPTOR_PROVIDES = [
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    NgZorroModuleExport,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
    // KeycloakAngularModule,
    ComponentCommonModule,
    ExceptionModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
    INTERCEPTOR_PROVIDES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
