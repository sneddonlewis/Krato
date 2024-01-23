import { NgModule, LOCALE_ID } from '@angular/core';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { TranslationModule } from 'app/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'kt', separator: '-', caseSensitive: true }),
    TranslationModule,
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [Title, { provide: LOCALE_ID, useValue: 'en' }, httpInterceptorProviders],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
  }
}
