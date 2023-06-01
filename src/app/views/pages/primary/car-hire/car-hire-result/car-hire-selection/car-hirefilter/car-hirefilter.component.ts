import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Mapboxgl from 'mapbox-gl';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { LabelType, Options } from 'ng5-slider';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/views/pages/shared/map/map.component';
@Component({
  selector: 'app-car-hirefilter',
  templateUrl: './car-hirefilter.component.html',
  styleUrls: ['./car-hirefilter.component.scss']
})
export class CarHirefilterComponent implements OnInit {
  @Input() result;
  @Input() filterSettings;
  @Input() searchModel;
  @Output() backward = new EventEmitter();
  filtredResult;
  map: Mapboxgl;
  markers: Mapboxgl.Marker[] = [];
  constructor( public translate: TranslateService,
               private languageServise: LanguageService,
               private cookie: CookieService,
               private dialogRef: MatDialog,
               private currencyPipe: CustomCurrencyPipe, ) { }

  ngOnInit(): void {
  }

  applyFilter(e){
    this.filtredResult = this.result;
    if (this.filterSettings.productType !== '') {
      this.filtredResult = this.filterByProductType(this.filtredResult);
    }
    this.filtredResult = this.filterByMinPriceTour(this.filtredResult);
    this.filtredResult = this.filterByMaxPriceTour(this.filtredResult);
    this.filtredResult = this.filterByCompanies(this.filtredResult);
    this.backward.emit(this.filtredResult);
  }
  filterByProductType(items) {
    const result = [];
    items.forEach(element => {
      if (element.car.type_name.toUpperCase().includes(this.filterSettings.productType.toUpperCase())) {
        result.push(element);
      }
    });
    return result;
  }
  filterByMinPriceTour(items) {
    const result = [];
    items.forEach(element => {
      if ( element.total_fare.totalFare >= this.filterSettings.minPrice) {
        result.push(element);

      }
    });
    return result;
  }
  filterByMaxPriceTour(items) {
    const result = [];
    items.forEach(element => {
      if (element.total_fare.totalFare <= this.filterSettings.maxPrice + 2) {
        result.push(element);
      }
    });
    return result;
  }
  changePriceToReset() {
    this.filterSettings.minPrice = this.filterSettings.ngSliderFloor;
    this.filterSettings.maxPrice = this.filterSettings.ngSliderCeil;
    this.applyFilter(null);
}
sliderOptions() {
  return {
    floor: this.filterSettings.ngSliderFloor,
    ceil: this.filterSettings.ngSliderCeil,
    translate: (value: number, label: LabelType): string => {
      return this.currencyPipe.transform(Math.round(value)) + ' ' + this.cookie.get('codeDevise');
    }
  };
}
initFilter() {
  this.changePriceToReset();
  this.filterSettings.productType = '';
  this.applyFilter(null);
}
openBiggerMap() {
  this.dialogRef.open(MapComponent, {
    width: '850px',
    height: '550px',
    data:  {pickupLatitude: this.searchModel.lattitude ,  pickupLongitude: this.searchModel.longitude}
  });
}
filterByCompanies(items) {
  const result = [];
  items.forEach((element) => {
    this.filterSettings.companies.forEach((company) => {
      if (company.value && company.code === element.partner.code ) {
        result.push(element);
      }
    });
  });
  return result;
}
  // filter config -All checked
  changeValueToCheckAll(key) {
       this.filterSettings[key].forEach((element) => {
        element.value = true;
      });
       this.applyFilter(null);
  }
  // filter config -None checked
  changeValueToNone(key) {
       this.filterSettings[key].forEach((element) => {
        element.value = false;
    });
       this.applyFilter(null);
  }
}
