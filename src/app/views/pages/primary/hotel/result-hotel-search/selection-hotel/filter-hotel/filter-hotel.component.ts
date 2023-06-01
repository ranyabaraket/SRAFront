import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { LabelType, Options } from 'ng5-slider';
import { Observable, Subscription } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';


@Component({
  selector: 'app-filter-hotel',
  templateUrl: './filter-hotel.component.html',
  styleUrls: ['./filter-hotel.component.scss']
})
export class FilterHotelComponent implements OnInit, OnDestroy {
  @Input() hotelData;
  @Output() backward = new EventEmitter();
  searchResultList;
  filtredRslt;
  starRating = [1, 2, 3, 4, 5];
  pricingList = [[0, 50], [50, 100], [100, 150], [150, 200], [200, 1000000]];
  filter1: any = {
    rating: true,
    rating1: true,
    rating2: true,
    rating3: true,
    rating4: true,
    rating0: true
  };
  filter: any = {
    price1: true,
    price2: true,
    price3: true,
    price4: true,
    price5: true
  };
  filter2: any = { hotelname: '' };
  searchModel;
  private eventsSubscription: Subscription;
  // @Input() events: Observable<void>;
  @Input() events: Observable<[]>;
  minValue: any;
  maxValue: any;
  // value: 40;
  // highValue: 60;
  curr = '$';
  codeDevise: string;
  options: Options;
  // options: Options = {
  //   floor: 0,
  //   ceil: 500,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return this.format(value) + ' ' + this.curr;
  //       case LabelType.High:
  //         return this.format(value) + ' ' + this.curr;
  //       default:
  //         return this.format(value) + ' ' +  this.curr;
  //     }
  //   }
  // };

  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe,
    private cookie: CookieService
  ) { 
    this.codeDevise = this.cookie.get('codeDevise');
    console.log(this.codeDevise);
    this.options= {
      floor: 0,
      ceil: 500,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return this.format(value) + ' ' + this.codeDevise;
          case LabelType.High:
            return this.format(value) + ' ' + this.codeDevise;
          default:
            return this.format(value) + ' ' +  this.codeDevise;
        }
      }
    };
    
    
    console.log(this.options);
  }
format(value){
  return this.currencyPipe.transform(Math.round(parseFloat(value)));
}
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    console.log("loggg data",this.hotelData);
    
 //   this.searchResultList = this.hotelData.searchResultList;
    // this.searchModel = this.hotelData.searchModel;
    this.eventsSubscription = this.events.subscribe((data) => {
      console.log("searchResultList",data);

      // this.searchResultList = data;
      // this.curr = this.searchResultList[0].currency;
      // this.minValue = (this.searchResultList[0].price.amount / this.searchModel.nbNights);
      // this.maxValue = (this.searchResultList[this.searchResultList.length - 1].price.amount / this.searchModel.nbNights);
      // const newOptions: Options = Object.assign({}, this.options);
      // newOptions.floor = Number(this.minValue);
      // newOptions.ceil = Number(this.maxValue);
      // this.options = newOptions;
      // this.changeValueToCheckAll();
      // this.changeValueToCheckAll1();
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  // applyFilter() {
  //   this.filtredRslt = this.searchResultList;
  //   if (this.filter2.hotelname.length > 0) {
  //     this.filtredRslt = this.applyFilterName();
  //   }
  //   this.verifyPriceCheck();
  //   this.verifyStarCheck();
  //   // if (this.pricingList.length > 0) {
  //   this.filtredRslt = this.applyFilterPrice();
  //   // }
  //   if (this.starRating.length > 0) {
  //     this.filtredRslt = this.applyFilterStar();
  //   }
  //   console.log("filtredRslt",this.filtredRslt);
    
  //   this.backward.emit(this.filtredRslt);
  // }

  // applyFilterName() {
  //   return this.filtredRslt.filter(e => e.name.toUpperCase().includes(this.filter2.hotelname.toUpperCase()));
  // }

  // verifyStarCheck() {
  //   this.starRating = [1, 2, 3, 4, 5];
  //   if (this.filter1.rating === false) {
  //     delete this.starRating[0];
  //   }
  //   if (this.filter1.rating1 === false) {
  //     delete this.starRating[1];
  //   }
  //   if (this.filter1.rating2 === false) {
  //     delete this.starRating[2];
  //   }
  //   if (this.filter1.rating3 === false) {
  //     delete this.starRating[3];
  //   }
  //   if (this.filter1.rating4 === false) {
  //     delete this.starRating[4];
  //   }
  // }

  // applyFilterStar() {
  //   this.verifyStarCheck();
  //   if (this.starRating.length !== 0) {
  //     // tslint:disable-next-line: prefer-for-of
  //     return this.filtredRslt.filter(element => this.starRating.includes(element.ratings));
  //   }
  // }

  // verifyPriceCheck() {
  //   this.pricingList = [[0, 50], [50, 100], [100, 150], [150, 200], [200, 1000000]];
  //   if (this.filter.price1 === false) {
  //     delete this.pricingList[0];
  //   }
  //   if (this.filter.price2 === false) {
  //     delete this.pricingList[1];
  //   }
  //   if (this.filter.price3 === false) {
  //     delete this.pricingList[2];
  //   }
  //   if (this.filter.price4 === false) {
  //     delete this.pricingList[3];
  //   }
  //   if (this.filter.price5 === false) {
  //     delete this.pricingList[4];
  //   }
  // }


  // applyFilterPrice() {
  //   let result = [];
  //   result = result.concat(this.filtredRslt.filter(element =>
  //     (element.price.amount / this.searchModel.nbNights) >= this.minValue
  //     &&
  //     (element.price.amount / this.searchModel.nbNights) <= this.maxValue));

  //   return result;
  // }
  // applyFilterPrice() {
  //   this.verifyPriceCheck();
  //   let result = [];
  //   if (this.pricingList.length !== 0) {
  //     this.pricingList.forEach(j => {
  //       result = result.concat(this.filtredRslt.filter(element =>
  //         (element.minimumAmount.amount / this.searchModel.nbNights) >= j[0]
  //         &&
  //         (element.minimumAmount.amount / this.searchModel.nbNights) < j[1]));
  //     });
  //   }
  //   return result;
  // }

  // changeValueToCheckAll() {
  //   this.filter.price5 = true;
  //   this.filter.price4 = true;
  //   this.filter.price3 = true;
  //   this.filter.price2 = true;
  //   this.filter.price1 = true;
  //   this.applyFilter();
  // }

  // changeValueToNone() {
  //   this.filter.price1 = false;
  //   this.filter.price2 = false;
  //   this.filter.price3 = false;
  //   this.filter.price4 = false;
  //   this.filter.price5 = false;
  //   this.applyFilter();
  // }

  // changeValueToCheckAll1() {
  //   this.filter1.rating1 = true;
  //   this.filter1.rating2 = true;
  //   this.filter1.rating3 = true;
  //   this.filter1.rating4 = true;
  //   this.filter1.rating0 = true;
  //   this.filter1.rating = true;
  //   this.applyFilter();
  // }

  // changeValueToNone1() {
  //   this.filter1.rating0 = false;
  //   this.filter1.rating4 = false;
  //   this.filter1.rating3 = false;
  //   this.filter1.rating2 = false;
  //   this.filter1.rating1 = false;
  //   this.filter1.rating = false;
  //   this.applyFilter();
  // }

  // resetValuePrix() {
  //   this.minValue = (this.searchResultList[0].price.amount / this.searchModel.nbNights).toFixed(2);
  //   this.maxValue = (this.searchResultList[this.searchResultList.length - 1].price.amount / this.searchModel.nbNights).toFixed(2);
  //   this.applyFilter();
  // }
  // initFilter() {
  //   this.changeValueToCheckAll1();
  //   this.changeValueToCheckAll();
  //   this.resetValuePrix();
  //   this.clearFilterName();
  // }
  // clearFilterName() {
  //   this.filter2.hotelname = '';
  //   this.applyFilter();
  // }

}
