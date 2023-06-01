import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengerDetailsFlightService } from '../passenger-details-flight.service';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-passenger-flight',
  templateUrl: './form-passenger-flight.component.html',
  styleUrls: ['./form-passenger-flight.component.scss']
})
export class FormPassengerFlightComponent implements OnInit {

  @Input() passenger;
  @Input() submitted;
  @Input() pays;
  @Input() type;

  mileCardcode;
  comp;
  years = [];
  BirthDatedays = [];
  expiredays = [];
  airlines = [];
  months;
  meals;
  currentYear = new Date().getFullYear();
  // Material for autocomplete input
  // firstNameCtrl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z ]+')]);
  filteredByFirstNamePsg: Observable<any[]>;
  filteredByLastNamePsg: Observable<any[]>;
  filteredByDocNumPsg: Observable<any[]>;
  @Output() backward = new EventEmitter();
  @ViewChild('passengerForm')
  passengerForm: FormGroupDirective;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private passengerDetailsFlightService: PassengerDetailsFlightService,
    private toastr: ToastrService,
    ) {

  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    for (let i = 0; i < 20; i++) {
      this.years.push(i + this.currentYear);
    }
    for (let i = 0; i < 31; i++) {
      let date;
      if (i < 9) {
        date = '0' + (i + 1);
      } else {
        date = String(i + 1);
      }
      this.BirthDatedays.push(date);
      this.expiredays.push(date);
    }
    this.meals = this.passengerDetailsFlightService.getMeals();
    this.months = this.passengerDetailsFlightService.getMonths();
    this.getAirlines();
  }

  fillDaysBirthDate() {
    let year;
    if (this.passenger.yyBirthDay) {
      year = this.passenger.yyBirthDay;
    } else {
      year = this.currentYear;
    }
    if (this.passenger.mmBirthDay) {
      this.BirthDatedays = [];
      for (let i = 0; i < 31; i++) {
        // tslint:disable-next-line: max-line-length
        if (new Date(Number(year), Number(this.passenger.mmBirthDay) - 1, i + 1).getMonth()
          - (Number(this.passenger.mmBirthDay) - 1) === 0) {
          // tslint:disable-next-line: max-line-length
          this.BirthDatedays.push(('0' + new Date(Number(year), Number(this.passenger.mmBirthDay) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
  }
  fillDaysExpireDate() {
    let year;
    if (this.passenger.yyExpiryDate) {
      year = this.passenger.yyExpiryDate;
    } else {
      year = this.currentYear;
    }
    if (this.passenger.mmExpiryDate) {
      this.expiredays = [];
      for (let i = 0; i < 31; i++) {
        // tslint:disable-next-line: max-line-length
        if (new Date(Number(year), Number(this.passenger.mmExpiryDate) - 1, i + 1).getMonth()
          - (Number(this.passenger.mmExpiryDate) - 1) === 0) {
          // tslint:disable-next-line: max-line-length
          this.expiredays.push(('0' + new Date(Number(year), Number(this.passenger.mmExpiryDate) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
  }
  getAirlines() {
    this.passengerDetailsFlightService.getAirlines().subscribe(
      data => {
        this.airlines = data;
      },
      err => console.log(err)
    );
  }
  test(passengerForm) {
    this.submitted = true;
    if (passengerForm.invalid) {
      console.log('err');
    }
  }
  genderChange(value) {
    if (value === 'MR') {
      this.passenger.sexe = 'M';
    }
    else {
      this.passenger.sexe = 'F';
    }
  }
  applyIntervalYears(value) {
    if (Number(value) < 1900) {
      this.passenger.yyBirthDay = '1900';
    } else if (Number(value) > this.currentYear) {
      this.passenger.yyBirthDay = this.currentYear;
    }
    this.fillDaysBirthDate();
  }
  getFirstName(value) {
    this.passenger.firstName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.passengerDetailsFlightService.searchPassengerByFirstName(this.passenger.firstName);
    }
  }
  geLastName(value) {
    this.passenger.lastName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.passengerDetailsFlightService.searchPassengerbyLastName(this.passenger.lastName);
    }
  }
  getDocNum(value) {
    //  this.passenger.passportNumber = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByDocNumPsg = this.passengerDetailsFlightService.searchPassengerbyNumDoc(this.passenger.passportNumber);
    }
  }
  addMileCard() {
    if (this.passenger.milesCardCodeList.find(
      m => m.codeComp === this.comp.iata
        && m.lcomp === this.comp.name
        && m.mileCardcode === this.mileCardcode

    )) {
      this.toastr.warning('Mile Already Exists');
      return;
    }
    this.passenger.milesCardCodeList.push({
      codeComp: this.comp.iata,
      lcomp: this.comp.name,
      mileCardcode: this.mileCardcode
    });
  }
  selectPassenger(option) {
    this.passenger.passengerTitle = option.passengerTitle;
    this.passenger.firstName = option.firstName;
    this.passenger.lastName = option.lastName;
    this.passenger.sexe = option.sexe;
    this.passenger.bagage = option.bagage;
    this.passenger.bithday = option.bithday;
    this.passenger.ddBirthDay = option.ddBirthDay;
    this.passenger.ddExpiryDate = option.ddExpiryDate;
    this.passenger.frequentFlyerNumber = option.frequentFlyerNumber;
    this.passenger.mealPreference = option.mealPreference;
    this.passenger.mmBirthDay = option.mmBirthDay;
    this.passenger.mmExpiryDate = option.mmExpiryDate;
    this.passenger.nationality = option.nationality;
    this.passenger.passportNumber = option.passportNumber;
    this.passenger.seatPreference = option.seatPreference;
    this.passenger.sendMail = option.sendMail;
    this.passenger.sexe = option.sexe;
    this.passenger.typeDoc = option.typeDoc;
    this.passenger.yyBirthDay = option.yyBirthDay;
    this.passenger.yyExpiryDate = option.yyExpiryDate;
    this.passenger.mail = option.mail;
    this.passenger.tel = option.tel;
    this.passenger.typeTel = option.typeTel;
    this.passenger.indTel = option.indTel;
    this.passenger.milesCardCodeList = option.milesCardCodeList;
    this.passenger.country = option.country;
    this.passenger.countryIdty = option.country;
    console.log(option);
    this.backward.emit(option);
    //   this.passenger  = {...option};
  }
  removeMileCard(i) {
    this.passenger.milesCardCodeList = this.passenger.milesCardCodeList.filter(m => m !== this.passenger.milesCardCodeList[i]);
  }
}
