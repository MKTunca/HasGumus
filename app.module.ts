import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent, SafeHtmlPipe} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './_components/navbar/navbar.component';
import localeTr from '@angular/common/locales/tr';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-metarial.module';
import {ChatboxComponent} from './_components/chatbox/chatbox.component';
import {WarningComponent} from './_components/warning-component/warning.component';
import {CommonModule, registerLocaleData} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NotFoundModule} from './_components/not-found/not-found.module';
import {FooterinfoComponent} from './_components/footerinfo/footerinfo.component';
import { AboutComponent } from './about/about.component';
import { newsComponent } from './news/news.component';
import { FooterModule } from './_components/footer/footer.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
registerLocaleData(localeTr, 'tr');

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafeHtmlPipe,
    ChatboxComponent,
    WarningComponent,
    FooterinfoComponent,
    AboutComponent,
    newsComponent
  ],
  imports: [
    FooterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    NotFoundModule,
    BrowserAnimationsModule,
    CarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
