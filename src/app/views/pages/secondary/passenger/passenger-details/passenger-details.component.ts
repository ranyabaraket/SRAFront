import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PassengerDetailsService } from './passenger-details.service';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {
  @Input() data;
  initData;
  pays;
  years = [];
  months;
  airlines: any;
  paysItem: any;
  comp;
  mileCardcode;
  loadSave;
  submitted;
  loadReset;
  expiredays = [];
  currentYear = new Date().getFullYear();
  @Output() backward = new EventEmitter();
  constructor(
    private passengerDetailsService: PassengerDetailsService,
    private cookie: CookieService,
    private toastr: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService ) {
  }

  ngOnInit() {
    this.initData = this.data;
    this.getPays();
    this.getAirlines();
    let value = new Date().getFullYear();
    for (let i = 0; i < 20; i++) {
      this.years.push(value);
      value++;
    }
    for (let i = 0; i < 31; i++) {
      let date;
      if (i < 9) {
        date = '0' + (i + 1);
      } else {
        date = String(i + 1);
      }
      this.expiredays.push(date);
    }
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.months = this.passengerDetailsService.getMonths();
  }
  getPays() {
    this.passengerDetailsService.getCountries().subscribe(
      data => {
        this.pays = data;
        this.paysItem = this.pays.find(p => p.alpha_2_code === this.data.paysTel);
      },
      err => console.log(err)
    );
  }
  getAirlines() {
    this.passengerDetailsService.getAirlines().subscribe(
      data => {
        this.airlines = data;
      },
      err => console.log(err)
    );
  }
  save(saveForm) {
    this.submitted = true;
    if (saveForm.invalid) { return; }
    this.loadSave = true;
    this.passengerDetailsService.save(this.data).subscribe(
      data => {
        this.loadSave = false;
        this.toastr.success('Success');
      },
      err => {
        this.toastr.error(err);
        this.loadSave = false;
      }
    );
  }
  getIdfPays() {
    this.passengerDetailsService.getIdfPays(this.data.paysTel)
      .then(res => res.text())          // convert to plain text
      .then(text => this.data.indTelPays = text);
  }

  addMileCard() {
    if (this.data.milesCardCodeList.find(
      m => m.codeComp === this.comp.iata
        && m.lcomp === this.comp.name
        && m.mileCardcode === this.mileCardcode

    )) {
      this.toastr.warning('Mile Already Exists');
      return;
    }
    this.data.milesCardCodeList.push({
      codeComp: this.comp.iata,
      lcomp: this.comp.name,
      mileCardcode: this.mileCardcode
    });
  }
  cancel(): void {
    this.backward.emit(false);
  }
  getSrcImg(codeCom) {
    return 'https://www.worldsoftgroup.com/airelines/' + codeCom + '.png';
  }
  removeMileCard(i) {
    this.data.milesCardCodeList = this.data.milesCardCodeList.filter(m => m !== this.data.milesCardCodeList[i]);
  }
  fillDaysExpireDate() {
    let year;
    if (this.data.yyExpdocIdty) {
      year = this.data.yyExpdocIdty;
    } else {
      year = this.currentYear;
    }
    if (this.data.mmExpdocIdty) {
      this.expiredays = [];
      for (let i = 0; i < 31; i++) {
        // tslint:disable-next-line: max-line-length
        if (new Date(Number(year), Number(this.data.mmExpdocIdty) - 1, i + 1).getMonth()
          - (Number(this.data.mmExpdocIdty) - 1) === 0) {
          // tslint:disable-next-line: max-line-length
          this.expiredays.push(('0' + new Date(Number(year), Number(this.data.mmExpdocIdty) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
  }
}
