import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from '../../../shared/services/language.service';
import { InsuranceSearchModel } from '../insuranceSearchModel';
import { Observable } from 'rxjs';
import { InsuranceService } from '../insurance.service';


@Component({
  selector: 'app-insurance-search-form',
  templateUrl: './insurance-search-form.component.html',
  styleUrls: ['./insurance-search-form.component.scss']
})
export class InsuranceSearchFormComponent implements OnInit {

  @Input() data;
  searchModel: InsuranceSearchModel = new InsuranceSearchModel();
  TypeSearchList = [{ name: 'One way', value: 1 },
  { name: 'Round Trip', value: 2 }];

  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;
  nbDestination = 0;
  start: Date = new Date();
  datePipe = new DatePipe('en-US');
  inputdepartVol1;
  inputdestinationtVol1: string;
  disabledDays = true;
  nbDaysX: string;
  typeSearch1: number;
  nbDays1: number;

  constructor(
    public dialog: MatDialog,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private insuranceService: InsuranceService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.searchModel = { ... this.data };
      if (this.searchModel.returnDateTime) {
        this.typeSearch1 = 2;
        const datee = new Date(this.searchModel.departDateTime);
        this.searchModel.departDateTime = datee;
        this.searchModel.returnDateTime = this.searchModel.returnDateTime;
        this.disabledDays = false;
        const invitedDate = this.searchModel.departDateTime;
        const invitedDate2 = this.searchModel.returnDateTime;
        const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
        this.nbDays1 = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
        this.nbDaysX = '(' + this.nbDays1 + 'days)';
        this.searchModel.nbrJour = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));

      }else{
        this.typeSearch1 = 1;
      }
      // tslint:disable-next-line: max-line-length
      this.inputdepartVol1 = this.searchModel.departCountryCode + '-' + this.searchModel.departureAirport + '-' + this.searchModel.departStationCode;
      // tslint:disable-next-line: max-line-length
      this.inputdestinationtVol1 = this.searchModel.arrivalCountryCode + '-' + this.searchModel.arrivelAirport + '-' + this.searchModel.arrivalStationCode;
    }
    document.getElementById('DropdownPassenger').addEventListener('click', e => {
      e.stopPropagation();
    });
    if (!this.data) {
      this.typeSearch1 = 1;
    }
  }

  changeValueTypeSearch(value) {
    this.typeSearch1 = value;
    if (value === 2 && !this.searchModel.returnDateTime) {
      this.searchModel.returnDateTime = '';
    }
    if (value === 2 && !this.searchModel.departDateTime) {
      this.searchModel.departDateTime = '';
    }
  }

  getAirportsFrom(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsFrom = this.insuranceService.getAirport(event.target.value);
    }
  }
  getAirportsTo(event) {
    if (event.target.value && event.target.value.length >= 3) {
      this.filteredOptionsTo = this.insuranceService.getAirport(event.target.value);
    }
  }

  filteredOptionsFromClear(event) {
    if (event) {
      this.searchModel.departStationCode = event.source.value.split('-')[2];
      this.searchModel.departCountryCode = event.source.value.split('-')[0];
      this.searchModel.departureAirport = event.source.value.split('-')[1];
    }
    this.filteredOptionsFrom = new Observable<string[]>();
  }
  filteredOptionsToClear(event) {
    if (event) {
      this.searchModel.arrivalStationCode = event.source.value.split('-')[2];
      this.searchModel.arrivalCountryCode = event.source.value.split('-')[0];
      this.searchModel.arrivelAirport = event.source.value.split('-')[1];
    }
    this.filteredOptionsTo = new Observable<string[]>();
  }

  changeEventArrial(evt) {
    this.searchModel.returnDateTime = evt.target.value; // this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
    if (this.searchModel.returnDateTime && this.searchModel.departDateTime) {
      const invitedDate = this.datePipe.transform(this.searchModel.departDateTime, 'yyyy-MM-dd');
      const invitedDate2 = this.datePipe.transform(evt.target.value, 'yyyy-MM-dd');
      const deference = new Date(invitedDate2).getTime() - new Date(invitedDate).getTime();
      this.nbDays1 = Math.round(Math.abs(deference / (1000 * 60 * 60 * 24)));
      this.nbDaysX = '(' + this.nbDays1 + 'days)';
      this.searchModel.nbrJour = this.nbDays1;
    }
  }
  changeEventDepart(evt) {
    this.searchModel.departDateTime = evt.target.value;
    this.searchModel.returnDateTime = null;
    this.disabledDays = false;
    this.nbDays1 = 0;
    this.nbDaysX = '';
    this.searchModel.nbrJour = 1;
  }

  changeDays(event) {
    this.nbDays1 = event.target.value;
    const tomorrow = new Date(this.searchModel.departDateTime);
    const tomorrow1 = new Date(this.searchModel.departDateTime);
    tomorrow.setDate(tomorrow1.getDate() + Number(event.target.value));
    this.searchModel.returnDateTime = tomorrow;
    this.nbDaysX = '(' + this.nbDays1 + 'days)';
    this.searchModel.nbrJour = this.nbDays1;

  }

  reset() {
    this.searchModel = new InsuranceSearchModel();
    this.inputdepartVol1 = '';
    this.inputdestinationtVol1 = '';
    this.nbDaysX = '';
    this.typeSearch1 = 1;
  }


  getSearchModel() {
    if (this.typeSearch1 !== 2) {
      this.searchModel.returnDateTime = null;
      this.searchModel.nbrJour = 1;
    }
    if (this.typeSearch1 === 2) {
      this.searchModel.nbrJour = this.nbDays1;
      this.searchModel.returnDateTime = this.datePipe.transform(this.searchModel.returnDateTime, 'yyyy-MM-dd');
    }
    this.searchModel.departDateTime = this.datePipe.transform(this.searchModel.departDateTime, 'yyyy-MM-dd');
    return this.searchModel;
  }


  disableButtonSearch() {
    if (this.typeSearch1 !== 2) {
      // tslint:disable-next-line: max-line-length
      if (!this.searchModel.departStationCode || !this.searchModel.arrivalStationCode || !this.searchModel.departDateTime) {
        return true;
      }
    }
    if (this.typeSearch1 === 2) {
      if (!this.searchModel.departStationCode || !this.searchModel.arrivalStationCode ||
        !this.searchModel.departDateTime || !this.searchModel.returnDateTime) {
        return true;
      }
    }
  }

  getSearch(item) {
    const date1 = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const date2 = this.datePipe.transform(item.dtDept, 'yyyy-MM-dd');
    if (date1 < date2){
      if (item.dtReturn != null) {
        this.typeSearch1 = 2;
        this.disabledDays = false;
        this.nbDaysX = '(' + item.nbrJours + 'days)';
        this.nbDays1 = item.nbrJours;
        this.searchModel.returnDateTime = item.dtReturn;
        this.searchModel.nbrJour = item.nbrJours;

      } else {
        this.typeSearch1 = 1;
        this.searchModel.nbrJour = 1;
      }
      this.searchModel.departureAirport = item.destIns.split('-')[1];
      this.searchModel.arrivelAirport = item.departIns.split('-')[1];
      this.searchModel.departStationCode = item.idDestIns;
      this.searchModel.arrivalStationCode = item.idDepartIns;
      this.searchModel.departCountryCode = item.destIns.slice(0, 2);
      this.searchModel.arrivalCountryCode = item.departIns.slice(0, 2);
      this.searchModel.departDateTime = item.dtDept;
      // tslint:disable-next-line: max-line-length
      this.inputdepartVol1 = item.destIns + ' ' + item.idDestIns;
      // tslint:disable-next-line: max-line-length
      this.inputdestinationtVol1 = item.departIns + ' ' + item.idDepartIns;
    } else {
      this.typeSearch1 = 1;
      this.nbDays1 = 1;
      this.searchModel.nbrJour = 1;
      this.disabledDays = true;
      this.nbDaysX = '(' + this.nbDays1 + 'days)';
      this.searchModel.departDateTime = null;
      this.searchModel.returnDateTime = null;
      this.searchModel.departureAirport = item.destIns.split('-')[1];
      this.searchModel.arrivelAirport = item.departIns.split('-')[1];
      this.searchModel.departStationCode = item.idDestIns;
      this.searchModel.arrivalStationCode = item.idDepartIns;
      this.searchModel.departCountryCode = item.destIns.slice(0, 2);
      this.searchModel.arrivalCountryCode = item.departIns.slice(0, 2);
      // tslint:disable-next-line: max-line-length
      this.inputdepartVol1 = item.destIns + ' ' + item.idDestIns;
      // tslint:disable-next-line: max-line-length
      this.inputdestinationtVol1 = item.departIns + ' ' + item.idDepartIns;
    }
  }

}
