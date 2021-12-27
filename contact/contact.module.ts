import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact.component';
import {RouterModule} from '@angular/router';
import {contactRoutes} from './contact.routes';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ContactComponent],
  exports: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoutes),
    TranslateModule
  ]
})
export class ContactModule {
}
