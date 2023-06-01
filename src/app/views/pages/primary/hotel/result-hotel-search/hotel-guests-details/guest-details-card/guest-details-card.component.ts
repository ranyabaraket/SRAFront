import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HotelGuestsDetailsService } from '../hotel-guests-details.service';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-guest-details-card',
  templateUrl: './guest-details-card.component.html',
  styleUrls: ['./guest-details-card.component.scss']
})
export class GuestDetailsCardComponent implements OnInit {
  @Input() submitted;
  @Input() guestModel;
  filteredByFirstNamePsg: Observable<any[]>;
  filteredByLastNamePsg: Observable<any[]>;
  months: any;
  token: any;
  pays: any;
  years = [];
  BirthDatedays = [];
  currentYear = new Date().getFullYear();
  @ViewChild('inputGuestForm')
  inputGuestForm: FormGroupDirective;
  yyBirthDay;
  mmBirthDay;

  constructor(
    private hotelGuestsDetailsService: HotelGuestsDetailsService,
    private languageServise: LanguageService,
    public translate: TranslateService
  ) {}

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
    }
    this.getPays();
    this.months = this.hotelGuestsDetailsService.getMonths();
  }

  getPays() {
    this.hotelGuestsDetailsService.getPays().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }

  fillDaysBirthDate() {
    let year;
    if (this.guestModel.yyBirthDay) {
      year = this.guestModel.yyBirthDay;
    } else {
      year = this.currentYear;
    }
    if (this.guestModel.mmBirthDay) {
      this.BirthDatedays = [];
      for (let i = 0; i < 31; i++) {
        if (new Date(Number(year), Number(this.guestModel.mmBirthDay) - 1, i + 1).getMonth()
          - (Number(this.guestModel.mmBirthDay) - 1) === 0) {
          this.BirthDatedays.push(('0' + new Date(Number(year), Number(this.guestModel.mmBirthDay) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
  }

  applyIntervalYears(value) {
    if (Number(value) < 1900) {
      this.guestModel.yyBirthDay = '1900';
    } else if (Number(value) > this.currentYear) {
      this.guestModel.yyBirthDay = this.currentYear;
    }
    this.fillDaysBirthDate();
  }

  getFirstName(value) {
    this.guestModel.firstName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.hotelGuestsDetailsService.searchPassengerByFirstName(this.guestModel.firstName);
    }
  }
  geLastName(value) {
    this.guestModel.lastName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.hotelGuestsDetailsService.searchPassengerbyLastName(this.guestModel.lastName);
    }
  }

  selectPassenger(option) {
    this.guestModel.firstName = option.firstName;
    this.guestModel.lastName = option.lastName;
    this.guestModel.identityNo = option.passportNumber;
    this.guestModel.ddBirthDay = option.ddBirthDay;
    this.guestModel.mmBirthDay = option.mmBirthDay;
    this.guestModel.yyBirthDay = option.yyBirthDay;
  }

}
