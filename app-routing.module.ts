import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { newsComponent } from './news/news.component';
import {ROUTING} from './shared/routing';
import {NotFoundComponent} from './_components/not-found/not-found.component';
import { CarouselComponent } from './_components/carousel/carousel.component';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { SilderComponent } from './silder/silder.component';
import { HaberComponent } from './_components/haber/haber.component';

const routes: Routes = [
  {
    path: ROUTING.HOME,
    loadChildren: () => import('./Home/home.module').then((m) => m.HomeModule)
  },
  {
    path:"carousel",
    component:CarouselBasicComponent
  },
  {
    path:"silder",
    component:SilderComponent
  },
  {
    path: ROUTING.CURRENCY,
    loadChildren: () => import('./currency/currency.module').then((m) => m.CurrencyModule)
  },
  {
    path: ROUTING.GOLD,
    loadChildren: () => import('./gold/gold.module').then((m) => m.GoldModule)
  },
  // {
  //   path: ROUTING.INFORMATION,
  //   loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
  // },
  {
    path: ROUTING.CONTACT,
    loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: ROUTING.INFORMATION,
    component:AboutComponent
  },
  {
    path:"news",
    component:newsComponent
  },
  {
    path:"haber",
    component:HaberComponent
  },
  {
    path: ROUTING.UYUM,
    component: NotFoundComponent,
    canActivate: [],
    data: {
      breadcrumb: 'Hata',
    }
  },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ROUTING.HOME
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
