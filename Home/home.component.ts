import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketData } from '../_models/socketData';
import { HomeProvider } from '../_services/home.provider';
import { Subscription } from 'rxjs';
import { Categories } from '../_models/categories';
import AOS from 'aos';
import { CATEGORYTYPE } from "../_models/categoryType";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isClicked: boolean = false;
  currencyList: SocketData[] = [];
  goldList: SocketData[] = [];
  parityList: SocketData[] = [];
  kriptoList: SocketData[] = [];
  ziynetList: SocketData[] = [];

  dataListReplace2: SocketData[] = [];
  dataListReplace3: SocketData[] = [];
  dataListReplace4: SocketData[] = [];
  dataListReplace5: SocketData[] = [];
  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 2,
        nav: true,
        loop: false
      },
      1500: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  }

  images = [
    {
      text: "Everfresh Flowers",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/1.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/2.jpg"
    },
    {
      text: "Morning Greens",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/3.jpg"
    },
    {
      text: "Bunch of Love",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/4.jpg"
    },
    {
      text: "Blue Clear",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/5.jpg"
    },
    {
      text: "Evening Clouds",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/7.jpg"
    },
    {
      text: "Fontains in Shadows",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/8.jpg"
    },
    {
      text: "Kites in the Sky",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/9.jpg"
    },
    {
      text: "Sun Streak",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/10.jpg"
    }
  ]
  categories: Categories[] = [];
  code: string;

  socketDataList: SocketData[] = [];
  dataList: SocketData[] = [];
  dataList1: SocketData[] = [];
  dataList2: SocketData[] = [];
  dataList3: SocketData[] = [];
  dataList4: SocketData[] = [];
  dataListReplace1: SocketData[] = [];
  dataListReplace6: SocketData[] = [];

  private subscriptions = new Subscription();
  public pingStatus = true;
  RETRY_SECONDS = 30;
  timer: any;
  interval: any;

  constructor(private service: HomeProvider) {
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.pingStatus === false) {
        this.subscriptions.unsubscribe();
        this.subscriptions = new Subscription();
        this.getSocketData();
      }
    }, this.RETRY_SECONDS * 1000);
    this.getSocketData();
    this.categories = this.service.getCategories();
    AOS.init();
  }
  getSocketData() {
    this.service.initSocket();
    this.subscriptions.add(this.service.connectWebSocket().subscribe((Sdata: SocketData[]) => {
      clearTimeout(this.timer);
      this.pingStatus = true;
      this.socketDataList = Sdata;
      this.filterCategories();
      this.timer = setTimeout(() => {
        this.pingStatus = false;
      }, 2000);
    },
      (err) => {
        this.pingStatus = true;
      },
      () => {
        this.pingStatus = false;
      }));
  }

  trackByPrice(index: number, code): void {
    return code.Ask;
  }

  filterCategories(): void {
    this.dataList = [];
    this.dataList1 = [];
    this.dataList2 = [];
    this.dataList3 = [];
    this.dataList4 = [];
    this.socketDataList.forEach((item) => {
      if (item.Category === CATEGORYTYPE.DOVIZ) {
        this.dataList1.push(item);
      }
      else {
        this.dataList.push(item);
      }
      if (item.Category === CATEGORYTYPE.MADEN) {
        this.dataList2.push(item);
      }
      else {
        this.dataList.push(item);
      }
      if (item.Category === CATEGORYTYPE.SARRAFIYE) {
        this.dataList3.push(item);
      }
      else {
        this.dataList.push(item);
      }
      if (item.Category === CATEGORYTYPE.PARITE) {
        this.dataList4.push(item);
      }
      else {
        this.dataList.push(item);
      }

    });
    if (this.dataListReplace1.length !== 0) {
      if (JSON.stringify(this.dataListReplace1) === JSON.stringify(this.dataList1)) {

      } else {
        this.dataList1.forEach((data, index) => {
          if (data.Ask !== this.dataListReplace1[index].Ask) {
            this.percentChange(data, this.dataListReplace1[index]);
          } else {
            data.askPercentChange = 0.00;
            this.dataListReplace1[index].askPercentChange = data.askPercentChange;
          }
        });
      }
    } else {
      this.dataListReplace1 = this.dataList1;
    }
    if (this.dataListReplace6.length !== 0) {
      if (JSON.stringify(this.dataListReplace6) === JSON.stringify(this.dataList)) {

      } else {
        this.dataList.forEach((data, index) => {
          if (data.Ask !== this.dataListReplace6[index].Ask) {
            this.percentChange(data, this.dataListReplace6[index]);
          } else {
            if (data.askPercentChange) {
              this.dataListReplace6[index].askPercentChange = data.askPercentChange;
            } else {
              data.askPercentChange = 0.00;
              this.dataListReplace6[index].askPercentChange = data.askPercentChange;
            }
          }
        });
      }
    } else {
      this.dataListReplace6 = this.dataList;
    }

    //Döviz
    if (this.dataListReplace2.length !== 0) {
      if (JSON.stringify(this.dataListReplace2) === JSON.stringify(this.dataList2)) {

      } else {
        this.dataList2.forEach((data, index) => {
          if (data.Ask !== this.dataListReplace2[index].Ask) {
            this.percentChange(data, this.dataListReplace2[index]);
          } else {
            data.askPercentChange = 0.00;
            this.dataListReplace2[index].askPercentChange = data.askPercentChange;
          }
        });
      }
    } else {
      this.dataListReplace2 = this.dataList1;
    }
    if (this.dataListReplace6.length !== 0) {
      if (JSON.stringify(this.dataListReplace6) === JSON.stringify(this.dataList)) {

      } else {
        this.dataList.forEach((data, index) => {
          if (data.Ask !== this.dataListReplace6[index].Ask) {
            this.percentChange(data, this.dataListReplace6[index]);
          } else {
            if (data.askPercentChange) {
              this.dataListReplace6[index].askPercentChange = data.askPercentChange;
            } else {
              data.askPercentChange = 0.00;
              this.dataListReplace6[index].askPercentChange = data.askPercentChange;
            }
          }
        });
      }
    } else {
      this.dataListReplace6 = this.dataList;
    }
  }
  percentChange(newData, oldData): void {
    if (newData.Ask !== oldData.Ask) {
      const oldAskPrice = +oldData.Ask;
      const newAskPrice = +newData.Ask;
      const askPriceDifference = (1 - (oldAskPrice / newAskPrice)) * 100;
      newData.askPercentChange = +askPriceDifference.toFixed(2);
      newData.Time = Date.now();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
