import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { HotelGuestsDetailsService } from '../hotel-guests-details.service';
@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.scss']
})
export class GuestDetailsComponent implements OnInit {

  @ViewChild('clientForm')
  clientForm: FormGroupDirective;
  filteredByEmailPsg: Observable<any[]>;
  filteredByNumTelPsg: Observable<any[]>;
  @Input() submitted;
  @Input() guestModel;
  pays: any;
  confirmEmail;
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService,
    private hotelGuestsDetailsService: HotelGuestsDetailsService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.getPays();
    window.onload = () => {
      const confirmEmailInput = document.getElementById('confirmEmailInput');
      confirmEmailInput.onpaste = e => e.preventDefault();
    };
  }
  getPays() {
    this.hotelGuestsDetailsService.getCountries().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }
  getIdfPays(evt) {
    this.hotelGuestsDetailsService.getIdfPays(this.guestModel.countryTel)
      .then(res => res.text())          // convert to plain text
      .then(text => this.guestModel.indPaysTel = text);
  }
  getEmail(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByEmailPsg = this.hotelGuestsDetailsService.searchPassengerbyEmail(this.guestModel.email);
    }
  }
  getNumTel(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByNumTelPsg = this.hotelGuestsDetailsService.searchPassengerbyTel(this.guestModel.phoneNumber);
    }
  }
  selectPassenger(option) {}
}
