import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-flight-history-details-voucher',
  templateUrl: './flight-history-details-voucher.component.html',
  styleUrls: ['./flight-history-details-voucher.component.scss']
})
export class FlightHistoryDetailsVoucherComponent implements OnInit {
  mntTicket: any;
  showPrice = true;
  checkPrice = true;
  adress;
   @Input() data: any;
  @Output() backward = new EventEmitter();
  constructor(
    public languageServise: LanguageService,
    private cookie: CookieService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe
  ) { }
  format(value){
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
   }
  ngOnInit(): void {
    this.adress = this.cookie.get('address');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.data.details.flightTickets.length; i++) {
      // tslint:disable-next-line: no-conditional-assignment
      if (this.data.details.flightTickets[i].numPassport = this.data.passenger.passportNum) {
        this.mntTicket = this.data.details.flightTickets[i].mntAFacturer + this.data.details.flightTickets[i].codeDevise;
      }
    }
  }
  getSrcImg(codeCom) {
    return 'https://worldsoftgroup.com/airelines/' + codeCom + '.png';
  }
  cancel(){
    this.backward.emit(false);
  }
}
