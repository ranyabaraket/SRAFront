import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { InsuranceService } from '../../../insurance.service';
import { InsurancePersonsDetailsService } from '../insurance-persons-details.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  @Input() submitted;
  @Input() guestModel;
  @ViewChild('inputGuestForm')
  inputGuestForm: FormGroupDirective;
  filteredByFirstNamePsg: Observable<any[]>;
  filteredByLastNamePsg: Observable<any[]>;
  filteredByDocNumPsg: Observable<any[]>;
  pays: any;
  years = [];
  BirthDatedays = [];
  currentYear = new Date().getFullYear();
  months: any;
  yyBirthDay: any;
  mmBirthDay: any;
  ddBirthDay: string;

  constructor(
    private insuranceService: InsuranceService,
    private insurancePersonsDetailsService: InsurancePersonsDetailsService
  ) { }

  ngOnInit(): void {
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
    this.months = this.insurancePersonsDetailsService.getMonths();
  }

  getPays() {
    this.insurancePersonsDetailsService.getPays().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }

  getFirstName(value) {
    this.guestModel.firstName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.insurancePersonsDetailsService.searchPassengerByFirstName(this.guestModel.firstName);
    }
  }
  geLastName(value) {
    this.guestModel.lastName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.insurancePersonsDetailsService.searchPassengerbyLastName(this.guestModel.lastName);
    }
  }
  getDocNum(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByDocNumPsg = this.insurancePersonsDetailsService.searchPassengerbyNumDoc(this.guestModel.identityNo);
    }
  }

  fillDaysBirthDate() {
    let year;
    if (this.yyBirthDay) {
      year = this.yyBirthDay;
    } else {
      year = this.currentYear;
    }
    if (this.mmBirthDay) {
      this.BirthDatedays = [];
      for (let i = 0; i < 31; i++) {
        if (new Date(Number(year), Number(this.mmBirthDay) - 1, i + 1).getMonth()
          - (Number(this.mmBirthDay) - 1) === 0) {
          this.BirthDatedays.push(('0' + new Date(Number(year), Number(this.mmBirthDay) - 1, i + 1).getDate()).slice(-2));
        }
      }
    }
    this.guestModel.dOB = this.yyBirthDay + '-' + this.mmBirthDay + '-' + this.ddBirthDay;
  }

  applyIntervalYears(value) {
    if (Number(value) < 1926) {
      this.yyBirthDay = '1926';
    } else if (Number(value) > this.currentYear) {
      this.yyBirthDay = this.currentYear;
    }
    this.fillDaysBirthDate();
    this.guestModel.age = 2021 - Number(this.yyBirthDay);
  }

  selectPassenger(option) {
    this.guestModel.firstName = option.firstName;
    this.guestModel.lastName = option.lastName;
    this.guestModel.gender = option.sexe;
    this.guestModel.dOB = option.bithday;
    this.guestModel.nationality = option.country;
    this.guestModel.identityNo = option.passportNumber;
    this.ddBirthDay = option.ddBirthDay;
    this.mmBirthDay = option.mmBirthDay;
    this.yyBirthDay = option.yyBirthDay;
    this.guestModel.age = 2021 - Number(option.yyBirthDay);
  }

}
