import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
class Item {
  one = 0;
  tow = 0;
}
@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss'],
})
export class StatisticsTableComponent implements OnInit {
  @Input() data;
  @Output() backward = new EventEmitter();
  selectionCase = [
    { one: -1, tow: -1, code: '' },
    { one: -1, tow: -1 }
  ];
  // pricePerCompagny;
  // flights;
  // filterSettings;
  constructor(private currencyPipe: CustomCurrencyPipe) {}

  ngOnInit(): void {
    // this.pricePerCompagny = this.data.pricePerCompagny;
    // this.flights = this.data.flights;
    // this.filterSettings = this.data.filterSettings;
  }
  initTable() {
    this.selectionCase = [
      { one: -1, tow: -1, code: ''},
      { one: -1, tow: -1 }
    ];
  }
  filterByCompany(company, i) {
    // this.selectionCase = [0, i];
    this.selectionCase[0] = { one: 0, tow: i, code: company };
    this.selectionCase[1] = { one: -1, tow: -1 };
    const result = [];
    this.data.filterSettings.companies.forEach((comp) => {
      if (comp.code === company) {
        comp.value = true;
      } else {
        comp.value = false;
      }
    });
    this.data.flights.forEach((flight) => {
      if (flight.originDestinationOptions[0].airlineCodes[0][0] === company) {
        result.push(flight);
      }
    });
    this.backward.emit(result);
  }
  filterBynbStops(nbStops, i) {
    //  this.selectionCase[0] =  {one : -1 , tow : -1 }; this.selectionCase.forEach(el => {
    //  if (i > 1){this.selectionCase[i] = { one: -1, tow: -1 }; }
    //   index ++ ;
    // });
    if (this.selectionCase.length < this.data.filterSettings.nbstops.length + 2)
    {this.selectionCase.push({ one: i, tow: 0 , code : nbStops}); }
    this.selectionCase[1] = { one: -1, tow: -1 };
    // this.selectionCase = [i, 0];
    const result = [];
    this.data.flights.forEach((flight) => {
      this.selectionCase.forEach(element => {
      if (flight.originDestinationOptions[0].nbStop === element.code) {
        if (
          (this.selectionCase[0].code.length &&
          this.selectionCase[0].code ===
            flight.originDestinationOptions[0].airlineCodes[0][0]) ||
            !this.selectionCase[0].code.length
        )
          {result.push(flight); }
      }
      } );
    });
    this.data.filterSettings.nbstops.forEach((stp) => {
      stp.value = false;
      this.selectionCase.forEach(element => {
        if (element.code === stp.name){
          stp.value = true;
        }
      });
    });
    this.backward.emit(result);

  }
constainsStr(str) {
    let i = 0;
    this.selectionCase.forEach(element => {
        if (i > 1 &&   element.code === str){
        return true;
        }
        i ++;
      });
    return false;
  }
filterBynbStopsAndCompany(company, nbStops, price, i, j) {
    this.selectionCase = [{ one: -1, tow: -1, code : '' }, { one: i, tow: j }];
    this.data.filterSettings.companies.forEach((comp) => {
      comp.value = true;
    });
    this.data.filterSettings.nbstops.forEach((stp) => {
      stp.value = true;
    });
    const result = [];
    this.data.flights.forEach((flight) => {
      if (
        flight.originDestinationOptions[0].nbStop.includes(nbStops) &&
        flight.originDestinationOptions[0].airlineCodes[0][0] === company &&
        Number(flight.totalFare[0].amount) <= Number(price)
      ) {
        result.push(flight);
      }
    });
    this.backward.emit(result);
  }
  formatCurr(c) {
    return this.currencyPipe.transform(Math.round(parseFloat(c)));
  }
}
