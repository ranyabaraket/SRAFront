import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { PageEvent } from '@angular/material/paginator';
import { RestrictionsComponent } from './restrictions/restrictions.component';
import { SearchModel } from '../../searchModel';
import { FilterModel } from './filter/filterModel';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreFlightDataService } from '../../store-flight-data.service';
import { ResultService } from '../result.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit, OnDestroy, AfterViewInit {
  showSearchForm = false;
  searchModel: SearchModel = new SearchModel();

  flightsFiltred = [];
  flights = [];

  credits;
  loadingSearch = true;

  pricePerCompagny = [];
  progressMode: ProgressBarMode = 'indeterminate';
  progressValue = 0;

  lowValue = 0;
  highValue = 10;
  start: Date = new Date();
  iteneraryData = { mail: '', includePrice: false, fareSourceCodes: [] };
  submittedItenerary;
  filterSettings = [];
  bestPriceFlight;
  filterOepned: boolean;
  statisticsTableOpned: any;
  restrictions;

  step = { name: 'Selection', stepPassed: false, stepActive: false };
  oboeSub;
  nbDaysX: string;
  selectionCase = [
    { one: -1, tow: -1 },
    { one: -1, tow: -1 },
    { one: -1, tow: -1 },
  ];
  constructor(
    private resultService: ResultService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private storeFlightDataService: StoreFlightDataService) {

  }
  ngAfterViewInit(): void {
    this.storeFlightDataService.changeStep(1);
  }
  ngOnDestroy(): void {
    if (this.oboeSub) { this.oboeSub.abort(); }
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.searchModel) {
        this.searchModel = res.searchModel;
        const invitedDate = this.searchModel.departleVol1;
        const invitedDate2 = this.searchModel.retourleVol1;
        const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
        this.searchModel.nbDays = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
        this.search(this.searchModel);
        this.getRestrictions();
      }
      else {
        this.router.navigate(['/pages/home']);
      }
    });
  }

  search(searchModel) {
    this.progressValue = 0;
    this.progressMode = 'indeterminate';
    this.flights = [];
    this.flightsFiltred = [];
    this.pricePerCompagny = [];
    let gdsSearched = 0;
    this.loadingSearch = true;
    const departFilter = new FilterModel();
    departFilter.destination = 'Depart';
    this.filterSettings[0] = departFilter;
    if (searchModel.typeSearch === 2
      && this.filterSettings.length === 1) {
      const arrivalFilter = new FilterModel();
      arrivalFilter.destination = 'Arrival';
      this.filterSettings.push(arrivalFilter);
    } else if (searchModel.typeSearch !== 2
      && this.filterSettings.length > 1) {
      this.filterSettings.pop();
    }
    this.oboeSub = this.resultService.streamSearch(searchModel, searchModel.typeSearch)
      .node('!', gds => {
        if (_.isArray(gds) && gds.length === 0) {
          this.loadingSearch = false;
          return;
        }
        if (gds[0] === undefined) {
          return;
        }
        gdsSearched++;
        this.progressMode = 'determinate';
        if (gdsSearched === Number(gds[0].message)) {
          setTimeout(() => {
            this.loadingSearch = false;
          }, 2000);
        }
      }).node('{baggageAllowance}', vol => {
        vol.sendQuote = false;
       // console.log(  vol );
        this.addAndsort(vol);
        this.filterConfig(vol);
        this.statisticsTabConfig(vol);
        this.bestPriceFlight = this.flights[0].fareSourceCode;
      }).fail(err => {
        console.log(err);
        this.loadingSearch = false;
        this.toastr.error('Error');
      }
      );
  }
  addAndsort(thing) {
    this.flights.push(thing);
    if (this.flights.length > 1) {
      this.flights.sort((a, b) => {
        return a.ptcFareBreakdowns[0].passengerFare.totalFare.amount - b.ptcFareBreakdowns[0].passengerFare.totalFare.amount;
      });
    }
    this.flightsFiltred.push(thing);
    if (this.flightsFiltred.length > 1) {
      this.flightsFiltred.sort((a, b) => {
        return a.ptcFareBreakdowns[0].passengerFare.totalFare.amount - b.ptcFareBreakdowns[0].passengerFare.totalFare.amount;
      });
    }
  }
  filterConfig(vol) {
    for (let i = 0; i < vol.originDestinationOptions.length; i++) {
      vol.originDestinationOptions[i].airlineCodes.forEach(element => {
        if (!this.filterSettings[i].companies.find(c => c.code === element[0])) {
          this.filterSettings[i].companies.push({ name: element[1], code: element[0], value: true });
        }
      });
      if (!this.filterSettings[i].nbstops.find(s => s.name === vol.originDestinationOptions[i].nbStop)) {
        if (vol.originDestinationOptions[i].nbStop[0] === 'D') {
          this.filterSettings[i].nbstops.unshift({ name: vol.originDestinationOptions[i].nbStop, value: true });
        }
        else { this.filterSettings[i].nbstops.push({ name: vol.originDestinationOptions[i].nbStop, value: true }); }
      }

      this.filterSettings[i].nbstops.sort((a, b) => {
        if (a.name[0] !== 'D' && b.name[0] !== 'D') {
          if (a.name[0] > b.name[0]) { return 1; }
          if (a.name[0] < b.name[0]) { return -1; }
        }
        return 0;
      });
      vol.originDestinationOptions[i].airlineCodes.forEach(element => {
        let j = 0;
        element.forEach(c => {
          j++;
          if (c.split(' ')[1] &&
            !this.filterSettings[i].classes.find(s => s.name === c.split(' ')[1]) && j > 2) {
            this.filterSettings[i].classes.push({ name: c.split(' ')[1], value: true });
          }
        });
      });
      this.filterSettings[i].classes.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      });
    }

  }
  statisticsTabConfig(vol) {
    const obj = {
      compagnie: { code: vol.originDestinationOptions[0].airlineCodes[0][0], name: vol.originDestinationOptions[0].airlineCodes[0][1] },
      details: [{
        nbStop: vol.originDestinationOptions[0].nbStop,
        price: vol.totalFare[0].amount,
        curr: vol.totalFare[0].currencyCode
      }]
    };
    if (this.pricePerCompagny.length === 0) {
      this.pricePerCompagny.push(obj);
      return;
    }
    if (!this.pricePerCompagny.find(p => p.compagnie.code === vol.originDestinationOptions[0].airlineCodes[0][0])) {
      this.pricePerCompagny.push(obj);
      return;
    }
    this.pricePerCompagny.forEach(p => {
      if (p.compagnie.code === vol.originDestinationOptions[0].airlineCodes[0][0]) {
        let ok;
        p.details.forEach(d => {
          if (d.nbStop === vol.originDestinationOptions[0].nbStop) {
            if (Number(d.price) - Number(vol.totalFare[0].amount) > 0) {
              d.price = vol.totalFare[0].amount;
            }
            ok = true;
          }
        });
        if (!ok) {
          p.details.push({
            nbStop: vol.originDestinationOptions[0].nbStop,
            price: vol.totalFare[0].amount,
            curr: vol.totalFare[0].currencyCode
          });
        }
      }
    });
    // sort price by nb stops
    this.sortPriceByNbStops();
  }
  sortPriceByNbStops() {
    for (let i = 0; i < this.filterSettings[0].nbstops.length; i++) {
      this.pricePerCompagny.sort((a, b) => {
        const stopA = a.details.filter(d => d.nbStop === this.filterSettings[0].nbstops[i].name);
        const stopB = b.details.filter(d => d.nbStop === this.filterSettings[0].nbstops[i].name);
        if (i === 0 || (i > 0 && a.details.filter(d => d.nbStop === this.filterSettings[0].nbstops[i - 1].name).length === 0 &&
          b.details.filter(d => d.nbStop === this.filterSettings[0].nbstops[i - 1].name).length === 0)) {
          if (stopA.length !== 0 && stopB.length !== 0) {
            if (Number(stopA[0].price) > Number(stopB[0].price)) {
              return 1;
            }
            if (Number(stopA[0].price) < Number(stopB[0].price)) {
              return -1;
            }
            return 0;
          }
          if (stopA.length !== 0) {
            return -1;
          }
          if (stopB.length !== 0) {
            return 1;
          }
        }
      });
    }
  }

  // paginator
  public getPage(event?: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  sendItinerary(sendEtenraryForm) {
    this.submittedItenerary = true;
    if (sendEtenraryForm.invalid) {
      return;
    }
    const quotes = this.flightsFiltred.filter(f => f.sendQuote === true);
    this.iteneraryData.fareSourceCodes = quotes.map(quote => quote.fareSourceCode);
    // tslint:disable-next-line: max-line-length
    // this.resultService.getFlightDetail(quotes[0].fareSourceCode).subscribe(
    //   data => {
    //     console.log(data.originDestinationOptions);
    //     this.iteneraryData.pricedItineraries[0].originDestinationOptions[0] = data.originDestinationOptions[0].segments[0];
    //     this.iteneraryData.pricedItineraries[0].originDestinationOptions[1] = data.originDestinationOptions[0].segments[1];

    //     this.resultService.sendEmail(this.iteneraryData).subscribe();
    //     this.toastr.success('e-mail send');
    //     this.submittedItenerary = false;

    //     console.log(this.iteneraryData);
    //   }
    // );
    if (quotes.length === 0) {
      this.toastr.warning(this.translate.instant('Select at least one flight'));
    }
    else {
      this.resultService.sendEmail(this.iteneraryData).subscribe();
      this.submittedItenerary = false;
      this.toastr.success(this.translate.instant('Email sent successfully'));
    }
  }

  getRestrictions() {
    this.resultService.getRestrictions(this.searchModel).subscribe(
      data => {
        if (data) {
          this.restrictions = data;
        }
        else {
          this.toastr.error('Error');
        }
      },
      err => console.log(err)
    );
  }
  openRestricions() {
    this.dialog.open(RestrictionsComponent, {
      data: this.restrictions,
      height: '100%',
      position: { right: '0%' },
      minWidth: '30%',
    });
  }
  filter(event) {
    this.flightsFiltred = event;
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
  openStatisticsTable() {
    const statisticsTable = document.getElementById('statistics-table');
    if (this.statisticsTableOpned) {
      statisticsTable.style.display = 'none';
      this.statisticsTableOpned = false;
    }
    else {
      statisticsTable.style.display = 'block';
      this.statisticsTableOpned = true;
    }
  }


}

