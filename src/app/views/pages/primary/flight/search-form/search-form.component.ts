import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SearchModel } from '../searchModel';
import { MatDialog } from '@angular/material/dialog';
import { FlightService } from '../flight.service';
import { HelpFlightComponent } from './help-flight/help-flight.component';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, AfterViewInit {
  @Input() data;
  gdsCss = {};
  searchModel: SearchModel = new SearchModel();
  TypeSearchList = [{ name: 'One way', value: 1 },
  { name: 'Round Trip', value: 2 },
  { name: 'Multi-destination', value: 3 }];
  classList = [
    { value: 'Y', name: 'Economy' },
    { value: 'C', name: 'Business' },
    { value: 'F', name: 'First Class' },
    { value: 'W', name: 'Premium' },
  ];

  GdsList =
    [
      { value: 'G', name: 'Aggregators', check: true },
      { value: 'L', name: 'Local Gds', check: true },
      { value: 'O', name: 'Other Gds', check: true },
      { value: 'C', name: 'LowCost only', check: true },
    ];
  listBagages = {
    null: 'Bagages',
    O: 'With bagages',
    N: 'Without bagages',
  };
  listStopOver = {
    null: 'Stop over',
    N: 'Non stop',
    C: '1+ stop',
  };
  listRefund = {
    null: 'Refundables fares',
    O: 'All fares',
    N: 'Only refundables fares'
  };

  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;
  filtredOptionAirline: Observable<string[]>;
  nbDestination = 0;
  start: Date = new Date();
  // inputPeriod = '';
  datePipe = new DatePipe('en-US');
  formsId = [];
  checkAllCompanies = true;
  preferredAirlines = [];
  disableButtonPopFlight = true;
  inputPreferdCompany;
  latestSearch: Observable<string[]>;
  flights: any;
  // departleVol1Input;
  inputdepartVol1;
  inputdestinationtVol1: string;
  disabledDays = true;
  nbDaysX: string;

  constructor(
    public dialog: MatDialog,
    private flightService: FlightService,
    private languageServise: LanguageService,
    public translate: TranslateService,

  ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.gdsCss = {
      color: 'white'
    };
    if (this.data) {
      this.gdsCss = {
        color: 'black'
      };
      this.searchModel = { ... this.data };
      if (this.searchModel.retourleVol1) {
        const datee = new Date(this.searchModel.departleVol1);
        //this.searchModel.departleVol1 = datee;
        this.searchModel.retourleVol1 = this.searchModel.retourleVol1;
        this.disabledDays = false;
        const invitedDate = this.searchModel.departleVol1;
        const invitedDate2 = this.searchModel.retourleVol1;
        const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
        this.searchModel.nbDays = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
        this.nbDaysX = '(' + this.searchModel.nbDays + 'days)';
      }
      this.inputdepartVol1 = this.searchModel.departVolTxt + ' | ' + this.searchModel.departVol1;
      this.inputdestinationtVol1 = this.searchModel.destinationVolTxt + ' | ' + this.searchModel.destinationVol1;
      if (this.searchModel.typeSearch === 3) {
        if (this.searchModel.departVol2 &&
          this.searchModel.destinationVol2 &&
          this.searchModel.departleVol2) {
          this.formsId.push({
            destination: this.searchModel.destinationVol2,
            depart: this.searchModel.departVol2,
            date: this.searchModel.departleVol2
          });
        }
        if (this.searchModel.departVol3 &&
          this.searchModel.destinationVol3 &&
          this.searchModel.departleVol3) {
          this.formsId.push({
            destination: this.searchModel.destinationVol3,
            depart: this.searchModel.departVol3,
            date: this.searchModel.departleVol3
          });
        }
        if (this.searchModel.departVol4 &&
          this.searchModel.destinationVol4 &&
          this.searchModel.departleVol4) {
          this.formsId.push({
            destination: this.searchModel.destinationVol4,
            depart: this.searchModel.departVol4,
            date: this.searchModel.departleVol4
          });
        }
        if (this.searchModel.departVol5 &&
          this.searchModel.destinationVol5 &&
          this.searchModel.departleVol5) {
          this.formsId.push({
            destination: this.searchModel.destinationVol5,
            depart: this.searchModel.departVol5,
            date: this.searchModel.departleVol5
          });
        }
      }
    }
    document.getElementById('DropdownPassenger').addEventListener('click', e => {
      e.stopPropagation();
    });
    document.getElementById('dropdownCompanies').addEventListener('click', e => {
      e.stopPropagation();
    });
  }
  exchangePrincipaleVol() {
    let auxi = this.searchModel.departVol1;
    this.searchModel.departVol1 = this.searchModel.destinationVol1;
    this.searchModel.destinationVol1 = auxi;
    auxi = this.inputdepartVol1;
    this.inputdepartVol1 = this.inputdestinationtVol1;
    this.inputdestinationtVol1 = auxi;
  }
  changeValueTypeSearch(value) {
    // this.searchModel.departleVol1 = null;
    this.searchModel.typeSearch = value;
    // this.searchModel.retourleVol1 = null;
    if (value === 2 && !this.searchModel.retourleVol1) {
      this.searchModel.retourleVol1 = '';
    }
    if (value === 2 && !this.searchModel.departleVol1) {
      this.searchModel.departleVol1 = '';
    }
    this.nbDestination = 0;
    this.formsId = [];
    this.disableButtonPopFlight = true;
  }
  changeValueClass(value) {
    this.searchModel.classe = value;
  }

  changeValueBaggage(value) {
    this.searchModel.baggage = value;
  }
  changeValueStopOver(value) {
    this.searchModel.flightType = value;
  }
  changeRefundables(value) {
    this.searchModel.refundable = value;
  }
  getAirportsFrom(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsFrom = this.flightService.getAirport(event.target.value);
    }
  }
  getAirportsTo(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsTo = this.flightService.getAirport(event.target.value);
    }
  }

  getAirlines(event) {
    if (event.target.value && event.target.value.length >= 2) {
      this.filtredOptionAirline = this.flightService.getAirLines(event.target.value);
    }
  }
  filtredOptionAirlineClear(evt) {
    const nameNewAir = evt.target.value.split(' - ')[0];
    const iataNewAir = evt.target.value.split(' - ')[1];
    if (!this.preferredAirlines.find(p => p.iata === iataNewAir) && iataNewAir) {
      this.preferredAirlines.push({ iata: iataNewAir, name: nameNewAir, value: true });
    }
    this.inputPreferdCompany = '';
    this.filtredOptionAirline = new Observable<string[]>();
  }
  filteredOptionsFromClear(event) {
    if (event) {
      this.searchModel.departVol1 = event.source.value.split(' | ')[1];
      this.searchModel.departVolTxt = event.source.value.split(' | ')[0];
    }
    this.filteredOptionsFrom = new Observable<string[]>();
  }
  filteredOptionsToClear(event) {
    if (event) {
      this.searchModel.destinationVol1 = event.source.value.split(' | ')[1];
      this.searchModel.destinationVolTxt = event.source.value.split(' | ')[0];
    }
    this.filteredOptionsTo = new Observable<string[]>();
  }

  changeEventArrial(evt) {
    this.searchModel.retourleVol1 = evt.target.value; // this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
    if (this.searchModel.retourleVol1 && this.searchModel.departleVol1) {
      const invitedDate = this.datePipe.transform(this.searchModel.departleVol1, 'yyyy-MM-dd');
      const invitedDate2 = this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
      const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
      this.searchModel.nbDays = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
      this.nbDaysX = '(' + this.searchModel.nbDays + 'days)';
    }
  }
  changeEventDepart(evt) {
    this.searchModel.departleVol1 = evt.target.value;
    this.searchModel.retourleVol1 = null;
    this.disabledDays = false;
    this.searchModel.nbDays = 0;
    this.nbDaysX = '';
  }

  changeDays(event) {
    this.searchModel.nbDays = event.target.value;
    const tomorrow = new Date(this.searchModel.departleVol1);
    const tomorrow1 = new Date(this.searchModel.departleVol1);
    tomorrow.setDate(tomorrow1.getDate() + Number(event.target.value));
   // this.searchModel.retourleVol1 = tomorrow;
    this.nbDaysX = '(' + this.searchModel.nbDays + 'days)';
  }

  addForm() {
    if (this.nbDestination < 4) {
      this.nbDestination++;
      this.formsId.push({ destination: '', depart: '', date: '' });
      this.disableButtonPopFlight = false;
    }
  }
  popForm() {
    if (this.nbDestination > 0) {
      this.nbDestination--;
      this.formsId.pop();
      if (this.nbDestination === 0) {
        this.disableButtonPopFlight = true;
      }
    }
  }
  exchangeSecondary(i) {
    const auxi = this.formsId[i].destination;
    this.formsId[i].destination = this.formsId[i].depart;
    this.formsId[i].depart = auxi;
  }
  openHelp(id) {
    const dialogRef = this.dialog.open(HelpFlightComponent, {
      height: '100%',
      position: { right: '0%' },
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id === 'to') {
          this.inputdestinationtVol1 = result.id.aireport + ' ' + result.id.ciata;
          this.searchModel.destinationVol1 = result.id.ciata;
        } else if (id === 'from') {
          this.searchModel.departVol1 = result.id.ciata;
          this.inputdepartVol1 = result.id.aireport + ' ' + result.id.ciata;
        }
      }
    });
  }
  selectedItem(array, value) {
    const item = array.find(a => a.value === value);
    if (item) {
      return item.name;
    }
    return '';
  }
  reset() {
    this.searchModel = new SearchModel();
    this.formsId = [];
    this.inputPreferdCompany = [];
    this.inputdepartVol1 = '';
    this.inputdestinationtVol1 = '';
    this.flights = [];
    this.nbDaysX = '';
  }
  disableButtonSearch() {
    if (this.searchModel.typeSearch !== 2) {
      if (!this.searchModel.departVol1 || !this.searchModel.destinationVol1 || !this.searchModel.departleVol1) {
        return true;
      }
    }
    if (this.searchModel.typeSearch === 2) {
      if (!this.searchModel.departVol1 || !this.searchModel.destinationVol1 ||
        !this.searchModel.departleVol1 || !this.searchModel.retourleVol1) {
        return true;
      }
    }
    if (this.searchModel.typeSearch === 3) {
      this.formsId.forEach(element => {
        if (!element.destination || !element.depart || !element.date) {
          return true;
        }
      });
    }
  }
  getSearch(item) {
    this.inputdestinationtVol1 = item.villeArrival + ' | ' + item.arrival;
    this.searchModel.destinationVolTxt = item.villeArrival;
    this.searchModel.destinationVol1 = item.arrival;
    this.inputdepartVol1 = item.villeDepart + ' | ' + item.depart;
    this.searchModel.departVolTxt = item.villeDepart;
    this.searchModel.departVol1 = item.depart;
    if (item.typeVol === 'R') {
      const datee = new Date(item.dtDepart);
      //this.searchModel.departleVol1 = datee;
      this.searchModel.retourleVol1 = item.dtArrival;
      this.searchModel.typeSearch = 2;
      this.disabledDays = false;
      const invitedDate = this.searchModel.departleVol1;
      const invitedDate2 = this.searchModel.retourleVol1;
      const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
      this.searchModel.nbDays = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
    }
    if (item.typeVol === 'O') {
      this.searchModel.departleVol1 = item.dtDepart;
      this.searchModel.typeSearch = 1;
      this.searchModel.retourleVol1 = null;
    }
  }
  filteredOptionsFromMultiClear(event, i) {
    if (event) {
      switch (i) {
        case 0: { this.searchModel.departVol2 = this.formsId[i].depart.split(' | ')[1]; break; }
        case 1: { this.searchModel.departVol3 = this.formsId[i].depart.split(' | ')[1]; break; }
        case 2: { this.searchModel.departVol4 = this.formsId[i].depart.split(' | ')[1]; break; }
        case 3: { this.searchModel.departVol5 = this.formsId[i].depart.split(' | ')[1]; break; }
      }
    }
    this.filteredOptionsFrom = new Observable<string[]>();
  }
  filteredOptionsToMultiClear(event, i) {
    if (event) {
      switch (i) {
        case 0: { this.searchModel.destinationVol2 = this.formsId[i].destination.split(' | ')[1]; break; }
        case 1: { this.searchModel.destinationVol3 = this.formsId[i].destination.split(' | ')[1]; break; }
        case 2: { this.searchModel.destinationVol4 = this.formsId[i].destination.split(' | ')[1]; break; }
        case 3: { this.searchModel.destinationVol5 = this.formsId[i].destination.split(' | ')[1]; break; }
      }
    }
    this.filteredOptionsTo = new Observable<string[]>();
  }

  getSearchModel() {
    if (this.searchModel.typeSearch === 3) {
      if (this.formsId[0]) {
        this.searchModel.departVol2 = this.formsId[0].depart.split(' | ')[1];
        this.searchModel.destinationVol2 = this.formsId[0].destination.split(' | ')[1];
        this.searchModel.departleVol2 = this.datePipe.transform(this.formsId[0].date, 'yyyy-MM-dd');
      }
      if (this.formsId[1]) {
        this.searchModel.departVol3 = this.formsId[1].depart.split(' | ')[1];
        this.searchModel.destinationVol3 = this.formsId[1].destination.split(' | ')[1];
        this.searchModel.departleVol3 = this.datePipe.transform(this.formsId[1].date, 'yyyy-MM-dd');
      }
      if (this.formsId[2]) {
        this.searchModel.departVol4 = this.formsId[2].depart.split(' | ')[1];
        this.searchModel.destinationVol4 = this.formsId[2].destination.split(' | ')[1];
        this.searchModel.departleVol4 = this.datePipe.transform(this.formsId[2].date, 'yyyy-MM-dd');
      }
      if (this.formsId[3]) {
        this.searchModel.departVol5 = this.formsId[3].depart.split(' | ')[1];
        this.searchModel.destinationVol5 = this.formsId[3].destination.split(' | ')[1];
        this.searchModel.departleVol5 = this.datePipe.transform(this.formsId[3].date, 'yyyy-MM-dd');
      }
    }
    if (this.searchModel.typeSearch !== 2) {
      this.searchModel.retourleVol1 = null;
    }
    if (this.searchModel.typeSearch === 2) {
      this.searchModel.retourleVol1 = this.datePipe.transform(this.searchModel.retourleVol1, 'dd/MM/yy');
    }
    this.searchModel.departleVol1 = this.datePipe.transform(this.searchModel.departleVol1, 'dd/MM/yy');

    const preferredAirlinescheckedlist = this.preferredAirlines.filter(a => a.value === true).map(p => p.iata);
    if (preferredAirlinescheckedlist.length) { this.searchModel.preferredAirlines = preferredAirlinescheckedlist; }
    else { this.searchModel.preferredAirlines = null; }

    return this.searchModel;

  }
  changeSelectedGds(gds) {
    gds.check = !gds.check;
    if (gds.check) {
      this.searchModel.typGds.push(gds.value);
    }
    else {
      this.searchModel.typGds.splice(this.searchModel.typGds.indexOf(gds.value), 1);
    }
  }
}
