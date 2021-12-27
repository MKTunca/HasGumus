import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {homeRoutes} from './home.routes';

import {FooterModule} from '../_components/footer/footer.module';
import {HomeProvider} from '../_services/home.provider';
import {NewsService} from '../_services/news.service';
import {TranslateModule} from '@ngx-translate/core';
import { FooterinfoComponent } from '../_components/footerinfo/footerinfo.component';
import { CarouselComponent } from '../_components/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CarouselBasicComponent } from '../carousel-basic/carousel-basic.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SilderComponent } from '../silder/silder.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    HomeComponent,
   SilderComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FooterModule,
    TranslateModule,
    CarouselModule,
    OwlModule,
    MatTabsModule,
    
  ],
  providers: [
    HomeProvider,
    NewsService,
  ]
})
export class HomeModule {
  constructor() { }

}
