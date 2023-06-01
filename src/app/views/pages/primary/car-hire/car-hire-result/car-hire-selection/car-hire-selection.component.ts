import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { StoreFlightDataService } from '../../../flight/store-flight-data.service';
import { map } from 'rxjs/operators';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { CarHireResultServiceService } from '../car-hire-result-service.service';
import * as _ from 'lodash';
import { PageEvent } from '@angular/material/paginator';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
@Component({
  selector: 'app-car-hire-selection',
  templateUrl: './car-hire-selection.component.html',
  styleUrls: ['./car-hire-selection.component.scss']
})
export class CarHireSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  oboeSub;
  searchModel;
  progressMode: ProgressBarMode = 'indeterminate';
  datePipe = new DatePipe('en-US');
  showSearchForm;
  filterSettings = {
    productType : '',
    minPrice : 0,
    maxPrice : 0,
    ngSliderCeil : 0,
    ngSliderFloor : 0,
    companies : [],
    isComplete : false,
};
  filterOepned;
  loadingSearch: boolean;
  progressValue: number;
  gds: number;
  lowValue = 0;
  highValue = 10;
  result = [];
  resultFiltred: any[];

  constructor(private storeFlightData: StoreFlightDataService,
              public translate: TranslateService,
              private languageService: LanguageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private currencyPipe: CustomCurrencyPipe,
              private carHireResultService: CarHireResultServiceService) { }

  ngOnInit(): void {
    this.languageService.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.searchModel) {
        this.searchModel = res.searchModel;
        this.search(this.searchModel);
      }
      else {
        this.router.navigate(['/pages/car-hire']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.oboeSub) { this.oboeSub.abort(); }
  }
  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(1);
  }
  search(searchModel) {
    this.loadingSearch = true;
    this.result = [];
    this.resultFiltred = [];
    this.progressValue = 0;
   // this.resultNumber = 0;
    this.progressMode = 'indeterminate';
    this.gds = 0;
    this.oboeSub = this.carHireResultService.streamSearch(searchModel)
      // .subscribe(data => console.log(data));
      .node('!', data => {
       // this.loadingSearch = false;
        this.gds++;
        if (data === undefined) {
          return;
        }
        if (!data) {
          return;
        }
        if (data[0].error && data[0].error.status) {
          this.toastr.warning(data[0].error.status);
          return;
        }
        if (data[0].error && !data[0].error.status) {
          this.toastr.warning(data[0].error);
          return;
        }
        if (!data[0] || !data[0].result_list) {
          return;
        }
        if (_.isArray(data[0].result_list)){
          // this.result =  data.results.result_list;
          // this.resultFiltred = [... this.result];
          data[0].result_list.forEach(element => {
            this.addAndSort(element);
            this.filterConfig(element);
          });
        }
        this.filterSettings.isComplete = true;
        this.progressMode = 'determinate';
        if (this.gds === 1// Number(data[0].message)
        ) {
          setTimeout(() => {
            this.loadingSearch = false;
          }, 2000);
        }
     //   console.log(this.result);
      // }).node('{baggageAllowance}', vol => {
      //  // vol.sendQuote = false;
      //  // console.log(  vol );
      //   this.addAndsort(vol);
        // this.filterConfig(vol);
        // this.statisticsTabConfig(vol);
        // this.bestPriceFlight = this.flights[0].fareSourceCode;
      }).fail(err => {
        console.log(err);
        this.loadingSearch = false;
        this.toastr.error('Error');
      }
      );
  }

  addAndSort(data) {
    this.result.push(data);
    if (this.result.length > 1) {
      this.result.sort((a, b) => {
        return a.total_fare.totalFare - b.total_fare.totalFare;
      });
    }
    this.resultFiltred.push(data);
    if (this.resultFiltred.length > 1) {
      this.resultFiltred.sort((a, b) => {
        return a.total_fare.totalFare - b.total_fare.totalFare;
      });
    }
  }
  filterConfig(data) {
    if (data.total_fare.totalFare > this.filterSettings.maxPrice) {
      this.filterSettings.maxPrice = data.total_fare.totalFare;
      this.filterSettings.ngSliderCeil =  data.total_fare.totalFare;
    }
    if (this.filterSettings.minPrice === 0 || data.total_fare.totalFare < this.filterSettings.minPrice) {
      this.filterSettings.minPrice =  data.total_fare.totalFare;
      this.filterSettings.ngSliderFloor =  data.total_fare.totalFare;
    }
    if (!this.filterSettings.companies.find(c => c.code === data.partner.code)) {
      this.filterSettings.companies.push({ name: data.partner.name,  code: data.partner.code, value: true });
    }
    // this.transferFiltred.push(Object.assign({}, transfer));
  }
  filter(event) {
    this.resultFiltred = event;
  }
  closeModal() {
    const modal = document.getElementById('filterCar-hire');
    modal.style.display = 'none';
  }
  // paginator
  public getPage(event?: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  openFilter() {
    const modal = document.getElementById('filterCar-hire');
    if (this.filterOepned) {
      modal.style.display = 'none';
      this.filterOepned = false;
    }
    else {
      modal.style.display = 'block';
      this.filterOepned = true;

    }
  }
  format(value){
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
}
