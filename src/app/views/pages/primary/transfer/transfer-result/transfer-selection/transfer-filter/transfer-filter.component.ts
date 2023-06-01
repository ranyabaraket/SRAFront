import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { LabelType, Options } from 'ng5-slider';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/views/pages/shared/map/map.component';
@Component({
  selector: 'app-transfer-filter',
  templateUrl: './transfer-filter.component.html',
  styleUrls: ['./transfer-filter.component.scss']
})
export class TransferFilterComponent implements OnInit {
  @Input() transferResult;
  @Input() filterSettings;
  @Input() searchModel;
  @Output() backward = new EventEmitter();
  transferFiltred;
  map: Mapboxgl;
  markers: Mapboxgl.Marker[] = [];
  constructor(
    private currencyPipe: CustomCurrencyPipe,
    private cookie: CookieService,
    public translate: TranslateService,
    private dialogRef: MatDialog,
    private languageServise: LanguageService) {
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.transferFiltred = this.transferResult;
    // Mapboxgl.accessToken = environment.mapboxkey;
    // if (this.searchModel) {
    //   const origin = [this.searchModel.pickupLatitude, this.searchModel.pickupLongitude];
    //   const destination = [this.searchModel.dropoffLatitude, this.searchModel.dropoffLongitude];
    //   const route = {
    //     type: 'FeatureCollection',
    //     features: [
    //       {
    //         type: 'Feature',
    //         geometry: {
    //           type: 'LineString',
    //           coordinates: [origin, destination]
    //         }
    //       }
    //     ]
    //   };
    //   this.map = new Mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [this.searchModel.pickupLatitude, this.searchModel.pickupLongitude],
    //     zoom: 10
    //   });
    //   // if (this.searchModel.pickupLongitude && this.searchModel.pickupLatitude) {
    //   const marker1 = new Mapboxgl.Marker()
    //     .setLngLat([this.searchModel.pickupLatitude, this.searchModel.pickupLongitude])
    //     .setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
    //       .setHTML('<p> Pickup </p>'))
    //     .addTo(this.map);
    //   //   }
    //   //   if (this.searchModel.dropoffLongitude && this.searchModel.dropoffLatitude) {
    //   const marker2 = new Mapboxgl.Marker()
    //     .setLngLat([this.searchModel.dropoffLatitude, this.searchModel.dropoffLongitude])
    //     .setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
    //       .setHTML('<p> Dropoff </p>'))
    //     .addTo(this.map);
    //   this.map.addControl(new Mapboxgl.NavigationControl());

    // }
  }
  filterByProductType(transfers) {
    const result = [];
    transfers.forEach(element => {
      if (element.general.producttype.toUpperCase().includes(this.filterSettings.productType.toUpperCase())) {
        result.push(element);
      }
    });
    return result;
  }
  filterByMinPriceTour(transfers) {
    const result = [];
    transfers.forEach(element => {
      if (Math.round(element.pricing.finalPrice) >= this.filterSettings.minPrice) {
        result.push(element);

      }
    });
    return result;
  }
  filterByMaxPriceTour(transfers) {
    const result = [];
    transfers.forEach(element => {
      if (Math.round(element.pricing.finalPrice) <= this.filterSettings.maxPrice) {
        result.push(element);
      }
    });
    return result;
  }
  applyFilter(event) {
    this.transferFiltred = this.transferResult;
    if (this.filterSettings.productType !== '') {
      this.transferFiltred = this.filterByProductType(this.transferFiltred);
    }
    this.transferFiltred = this.filterByMinPriceTour(this.transferFiltred);
    this.transferFiltred = this.filterByMaxPriceTour(this.transferFiltred);
    this.transferFiltred = this.filterByCompanies(this.transferFiltred);

    this.backward.emit(this.transferFiltred);
  }
  changePriceToReset() {
    this.filterSettings.minPrice = Math.round(this.filterSettings.ngSliderFloor);
    this.filterSettings.maxPrice = Math.round(this.filterSettings.ngSliderCeil);
    this.applyFilter(null);
  }
  sliderOptions() {
    return {
      floor: this.filterSettings.ngSliderFloor,
      ceil: this.filterSettings.ngSliderCeil,
      translate: (value: number, label: LabelType): string => {
        return this.currencyPipe.transform(value) + ' ' + this.cookie.get('codeDevise');
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
      data: this.searchModel
    });
  }
  filterByCompanies(transfers) {
    const result = [];
    transfers.forEach((element) => {
      this.filterSettings.companies.forEach((company) => {
        if (company.value && company.name === element.general.TransferCompany ) {
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
