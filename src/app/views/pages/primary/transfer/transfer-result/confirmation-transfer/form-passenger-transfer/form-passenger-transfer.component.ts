import { Component, Input, OnInit } from '@angular/core';
import { BookigTransferModel } from '../bookingTransferModel';

import { Observable } from 'rxjs';
import { ConfirmationTransferService } from '../confirmation-transfer.service';
import { CookieService } from 'ng2-cookies';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
@Component({
  selector: 'app-form-passenger-transfer',
  templateUrl: './form-passenger-transfer.component.html',
  styleUrls: ['./form-passenger-transfer.component.scss']
})
export class FormPassengerTransferComponent implements OnInit {

  filteredByFirstNamePsg: Observable<any[]>;
  filteredByLastNamePsg: Observable<any[]>;
  filteredByEmailPsg: Observable<any[]>;
  filteredByMoileNo: Observable<any[]>;
  countries;
  countrySelected;
  @Input() submitted;
  @Input() success;
  @Input() bookingModel;

  constructor(private confirmationTransferService: ConfirmationTransferService,
              private cookie: CookieService,
              public translate: TranslateService,
              private languageServise: LanguageService, ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.countries = this.confirmationTransferService.getCountries();
    document.getElementById('mailLead').addEventListener('paste', e => e.preventDefault());
  }

  getFirstName(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.confirmationTransferService.searchPassengerByFirstName(this.bookingModel.leadnameAff);
    }
  }
  geLastName(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.confirmationTransferService.searchPassengerbyLastName(this.bookingModel.leadsurnameAff);
    }
  }
  getEmail(value) {
    this.bookingModel.emailid = value.replaceAll(' ', '');
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.confirmationTransferService.searchPassengerbyEmail(this.bookingModel.emailid);
    }
  }
  getMobileNo(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.confirmationTransferService.searchPassengerbyTel(this.bookingModel.mobileNumber);
    }
  }
  selectPassenger(option) {
    this.bookingModel.leadTitle = option.passengerTitle;
    this.bookingModel.leadnameAff = option.firstName;
    this.bookingModel.leadsurnameAff = option.lastName;
    this.bookingModel.emailid = option.mail;
    this.bookingModel.mobileNo = option.tel;
  }

  getIdfPays(evt) {
    this.confirmationTransferService.getIdfPays(this.bookingModel.countryTel)
      .then(res => res.text())          // convert to plain text
      .then(text => this.bookingModel.indPaysTel = text);
  }

}
