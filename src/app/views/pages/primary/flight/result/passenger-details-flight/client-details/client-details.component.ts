import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengerDetailsFlightService } from '../passenger-details-flight.service';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  @Input() flightBookingModel;
  confirmEmail;
  @Input() submitted;
  @Input() pays;
  paysItem;
  @ViewChild('clientForm')
  clientForm: FormGroupDirective;
  filteredByEmailPsg: Observable<any[]>;
  filteredByNumTelPsg: Observable<any[]>;
  constructor(
    private passengerDetailsFlightService: PassengerDetailsFlightService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    document.getElementById('confirmEmailInput').addEventListener('paste', e => e.preventDefault());
  }
  text(clientForm) {
    this.submitted = true;
  }
  getIdfPays(evt) {
    this.passengerDetailsFlightService.getIdfPays(this.flightBookingModel.countryTel)
      .then(res => res.text())          // convert to plain text
      .then(text => this.flightBookingModel.indPaysTel = text);
  }
  getEmail(value) {
    //  this.passenger.passportNumber = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByEmailPsg = this.passengerDetailsFlightService.searchPassengerbyEmail(this.flightBookingModel.email);
    }
  }
  getNumTel(value) {
    //  this.passenger.passportNumber = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByNumTelPsg = this.passengerDetailsFlightService.searchPassengerbyTel(this.flightBookingModel.phoneNumber);
    }
  }
  selectPassenger(option) {
    this.flightBookingModel.adults[0] = option;
    this.flightBookingModel.email = option.mail;
    this.flightBookingModel.typeTel = option.typeTel;
    this.flightBookingModel.phoneNumber = option.tel;
    this.flightBookingModel.indPaysTel = option.indTel;
    this.flightBookingModel.countryTel = option.countryTel;
  }
}
