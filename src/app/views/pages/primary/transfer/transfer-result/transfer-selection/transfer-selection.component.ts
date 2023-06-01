import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { SearchTransfertModel } from '../../searchTransfertModel';
import { map } from 'rxjs/operators';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { TransferResultService } from '../transfer-result.service';
import { ToastrService } from 'ngx-toastr';
import { TransferFilterModel } from './transfer-filter/transferFilterModel';
import { StoreFlightDataService } from '../../../flight/store-flight-data.service';
import { TransferService } from '../../transfer.service';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/views/pages/shared/map/map.component';
@Component({
  selector: 'app-transfer-selection',
  templateUrl: './transfer-selection.component.html',
  styleUrls: ['./transfer-selection.component.scss']
})
export class TransferSelectionComponent implements OnInit, AfterViewInit, OnDestroy {

  errors: any;
  showSearchForm;
  loadingSearch = true;
  noDataFound;
  filterOepned: boolean;
  transferResult = [];
  transferFiltred = [];
  progressValue = 0;
  resultNumber = 0;
  lowValue = 0;
  highValue = 10;
  filterSettings: TransferFilterModel = new TransferFilterModel();
  searchModel: SearchTransfertModel = new SearchTransfertModel();
  searchResult = { origin_name: '', end_name: '', travelling: '', adults: 0, children: 0, infants: 0, transferType: 0 };
  progressMode: ProgressBarMode = 'indeterminate';
  oboeSub;
  datePipe = new DatePipe('en-US');
  gds: number;
  gdsTosearch;

  constructor(
    public translate: TranslateService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transferResultService: TransferResultService,
    private toastr: ToastrService,
    private storeFlightData: StoreFlightDataService,
    private dialogRef: MatDialog,
    private transferService: TransferService) { }
  ngOnDestroy(): void {
    if (this.oboeSub) { this.oboeSub.abort(); }
  }
  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(1);
  }

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
        this.router.navigate(['/pages/home']);
      }
    });
  }

  search(searchModel) {
    this.loadingSearch = true;
    this.transferResult = [];
    this.transferFiltred = [];
    this.progressValue = 0;
    this.resultNumber = 0;
    this.progressMode = 'indeterminate';
    this.gds = 0;
    this.oboeSub = this.transferResultService.streamSearch(searchModel)
      .node('!', data => {
        this.gds++;
        if (data === undefined) {
          return;
        }

        if (_.isArray(data) && data.length === 0) {
          return;
        }
        this.progressMode = 'determinate';
        this.progressValue = Math.floor(this.gds / Number(data[0].message) * 100);
        if (this.gds === Number(data[0].message)) {
          setTimeout(() => {
            this.loadingSearch = false;
          }, 2000);
        }
        if (_.isArray(data) && data.length && data[0].error) {
          this.toastr.warning(data[0].error);
          return ;
        }
        if (_.isArray(data) && data.length && data[0].Error) {
          this.toastr.warning(data[0].Error);
          return ;
        }
        if (data[0].errors) {
          this.noDataFound = true;
          if (data[0].errors.invalid_dates) {
            this.toastr.warning(data[0].errors.invalid_dates.message);
          }
          if (data[0].errors.travelling) {
            this.toastr.warning(data[0].errors.travelling.message);
          }
          if (data[0].errors.error) {
            this.toastr.warning(data[0].errors.error.message);
          }
        }
        else if (data[0].errors) {
          this.toastr.error(data[0].errors.error.message);
        }
        else if (!data[0].errors
          && data[0].travelling && _.isArray(data[0].travelling.products)
          && data[0].travelling.products.length) {
          this.searchResult = data[0].Search_Result;
          this.searchResult.transferType = this.searchModel.transferType;
          data[0].travelling.products.forEach(element => {
            this.addAndSort(element);
            this.filterConfig(element);
          });
        } else {
          this.noDataFound = true;
        }
        this.filterSettings.isComplete = true;
        this.progressMode = 'determinate';
      }).fail(err => {
        console.error(err);
        this.toastr.error('Server error');
        this.noDataFound = true;
        this.loadingSearch = false;
        this.progressMode = 'determinate';
      }
      );
  }
  // addAndSort(data) {
  //   this.transferResult = this.transferResult.concat(data[0].travelling.products)
  //     .sort((a, b) => a.pricing.price - b.pricing.price);
  //   this.resultNumber += data[0].travelling.products.length;
  //   this.searchResult = data[0].Search_Result;
  //   this.searchResult.transferType = this.searchModel.transferType;
  //   this.noDataFound = false;
  //   this.transferResult.forEach(
  //     element => this.filterConfig(element)
  //   );
  // }
  addAndSort(data) {
    this.noDataFound = false;
    this.transferResult.push(data);
    this.resultNumber++;
    this.transferResult.sort((a, b) => {
      return a.pricing.finalPrice - b.pricing.finalPrice;
    });
    this.transferFiltred.push(data);
    this.transferFiltred.sort((a, b) => {
      return a.pricing.finalPrice - b.pricing.finalPrice;
    });

  }
  filterConfig(transfer) {
    if (transfer.pricing.finalPrice > this.filterSettings.maxPrice) {
      this.filterSettings.maxPrice = Math.round(transfer.pricing.finalPrice);
      this.filterSettings.ngSliderCeil = Math.round(transfer.pricing.finalPrice);
    }
    if (this.filterSettings.minPrice === 0 || transfer.pricing.finalPrice < this.filterSettings.minPrice) {
      this.filterSettings.minPrice = Math.round(transfer.pricing.finalPrice);
      this.filterSettings.ngSliderFloor = Math.round(transfer.pricing.finalPrice);
    }
    if (!this.filterSettings.companies.find(c => c.code === transfer.general.TransferCompany)) {
      this.filterSettings.companies.push({ name: transfer.general.TransferCompany, value: true });
    }
    // this.transferFiltred.push(Object.assign({}, transfer));
  }
  filter(event) {
    this.transferFiltred = event;
  }
  openFilter() {
    const modal = document.getElementById('filter');
    if (this.filterOepned) {
      modal.style.display = 'none';
      this.filterOepned = false;
    }
    else {
      modal.style.display = 'block';
      this.filterOepned = true;

    }
  }
  closeModal() {
    const modal = document.getElementById('filter');
    modal.style.display = 'none';
  }
  // paginator
  public getPage(event?: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  isDate(str) {
    if (str.length > 10) {
      return true;
    }
    return false;
  }

  openBiggerMap() {
    this.dialogRef.open(MapComponent, {
      width: '850px',
      height: '550px',
      data: this.searchModel
    });
  }

}
