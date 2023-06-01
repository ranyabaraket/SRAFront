import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { LabelType, Options } from 'ng5-slider';
import { Observable, Subscription } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';


@Component({
  selector: 'app-filter-insurance',
  templateUrl: './filter-insurance.component.html',
  styleUrls: ['./filter-insurance.component.scss']
})
export class FilterInsuranceComponent implements OnInit {
  @Input() insuranceData;
  @Input() eventFilter: Observable<[]>;
  @Output() backward = new EventEmitter();
  private eventsSubscription: Subscription;

  @Input() eventInitFilter: Observable<[]>;
  minValue = 0;
  maxValue = 0;
  // value: 40;
  // highValue: 60;
  curr = '';
  options: Options = {
    floor: 0,
    ceil: 0,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return this.format(value) + ' ' + this.curr;
        case LabelType.High:
          return this.format(value)  + ' ' + this.curr;
        default:
          return this.format(value) + ' ' + this.curr;
      }
    }
  };
  filtredRslt: any;
  filter: any = {
    perPassenger: true,
    perBooking: true
  };
  insuranceData1: any;
  filter2: any = { insuranceType: '' };

  constructor( private cookie: CookieService,
               private currencyPipe: CustomCurrencyPipe) {
    this.curr = cookie.get('codeDevise');
   }

  ngOnInit(): void {
    this.eventsSubscription = this.eventFilter.subscribe((data) => {
      this.filtredRslt = data;
    });
    this.eventsSubscription = this.eventInitFilter.subscribe((data) => {
      this.insuranceData = data;
      if (this.insuranceData) { this.initialize(); }
    });
    // this.initialize();
  }

  initialize() {
    this.minValue = this.insuranceData[0].finalPrice.prixClient;
    this.maxValue = this.insuranceData[this.insuranceData.length - 1].finalPrice.prixClient;
    this.filter2.insuranceType = '';
    this.curr = this.insuranceData[0].finalPrice.currencyCode;
    this.minValue = this.insuranceData[0].finalPrice.prixClient;
    if (this.insuranceData.length > 1) {
      this.maxValue = this.insuranceData[this.insuranceData.length - 1].finalPrice.prixClient;
    }
    if (this.insuranceData.length === 1) {
      this.maxValue = this.insuranceData[0].finalPrice.prixClient;
    }
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = Number(this.minValue);
    newOptions.ceil = Number(this.maxValue);
    this.options = newOptions;
  }

  applyFilter() {
    this.filtredRslt = this.insuranceData;
    if (this.filter2.insuranceType.length > 0) {
      this.filtredRslt = this.applyFilterName();
    }
    this.filtredRslt = this.applyFilterPrice();
    // tslint:disable-next-line: no-conditional-assignment
    if (this.filter.perPassenger === false) {
      this.filtredRslt = this.applyFilterPerBooking();
    }
    // tslint:disable-next-line: no-conditional-assignment
    if (this.filter.perBooking === false) {
      this.filtredRslt = this.applyFilterPerPassenger();
    }
    // if (this.filtredRslt.length > 1) {
    //   this.minValue = this.filtredRslt[0].totalPremiumAmount;
    //   this.maxValue = this.filtredRslt[this.filtredRslt.length - 1].totalPremiumAmount;
    //   const newOptions: Options = Object.assign({}, this.options);
    //   newOptions.floor = Number(this.minValue);
    //   newOptions.ceil = Number(this.maxValue);
    //   this.options = newOptions;
    // }
    this.backward.emit(this.filtredRslt);
  }

  applyFilterName() {
    return this.filtredRslt.filter(e => e.planTitle.toUpperCase().includes(this.filter2.insuranceType.toUpperCase()));
  }

  applyFilterPrice() {
    let result = [];
    result = result.concat(this.filtredRslt.filter(element =>
      (element.finalPrice.prixClient) >= this.minValue
      &&
      (element.finalPrice.prixClient) <= this.maxValue));
    return result;
  }

  applyFilterPerPassenger() {
    let result = [];
    result = this.filtredRslt.filter(e => e.planPremiumChargeType.toUpperCase().includes('PASSENGER'));
    return result;
  }
  applyFilterPerBooking() {
    return this.filtredRslt.filter(e => e.planPremiumChargeType.toUpperCase().includes('BOOKING'));
  }
  resetValuePrix() {
    this.minValue = this.insuranceData[0].finalPrice.prixClient;
    this.maxValue =  this.insuranceData[this.insuranceData.length - 1].finalPrice.prixClient;
    this.applyFilter();
  }
  resetType() {
    this.filter.perPassenger = true;
    this.filter.perBooking = true;
    this.applyFilter();
  }
  resetName() {
    this.filter2.insuranceType = '';
    this.applyFilter();
  }

  resetFilter() {
    this.resetName();
    this.resetType();
    this.resetValuePrix();

  }
  format(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
}
