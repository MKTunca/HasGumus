import {  OnInit } from '@angular/core';
import AOS from 'aos';
import {Component} from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// @Pipe({ name: 'safeHtml' })
// export class SafeHtmlPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}

//   transform(value) {
//     console.log(this.sanitizer.bypassSecurityTrustHtml(value));

//     return this.sanitizer.bypassSecurityTrustHtml(value);
//   }
// }





@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  constructor() {
  }


  ngOnInit(): void {
    AOS.init();
  }
}
