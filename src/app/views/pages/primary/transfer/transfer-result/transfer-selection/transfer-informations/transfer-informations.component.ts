import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-informations',
  templateUrl: './transfer-informations.component.html',
  styleUrls: ['./transfer-informations.component.scss']
})
export class TransferInformationsComponent implements OnInit {
  @Input() transfer;
  @Input() searchResult;
  @Input() searchModel;
  credits;
  filterSettings;
  decriptionTruncated;
  traject;
  constructor(
    private cookie: CookieService,
    private currencyPipe: CustomCurrencyPipe,
    private toast: ToastrService,
    private router: Router,
    public translate: TranslateService,
    private languageServise: LanguageService) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.credits = this.cookie.get('credits');
    this.decriptionTruncated = this.transfer.general.description.slice(0, 200) + '...';
    if (this.searchModel.transferType === '1' || this.searchModel.transferType === 1) {
      this.traject = 'Airport to Hotel';
    } else {
      this.traject = 'Hotel to Airport';
    }
  }
  compareSoldeToPriceTransfer(amount) {
    if (parseFloat(this.currencyPipe.parse(this.credits)) - amount >= 0) {
      return true;
    }
    return false;
  }
  formatAmout(a) {
    return this.currencyPipe.transform(Math.round(parseFloat(a)));
  }
  showMore() {
    this.decriptionTruncated = this.transfer.general.description;

  }

  showLess() {
    this.decriptionTruncated = this.transfer.general.description.slice(0, 200) + '...';
  }
  selectTransfer(transfer) {
    if (this.cookie.get('canSelect') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    //  if (Number(transfer.pricing.price) <= this.credits) {
    const url = this.router.createUrlTree(['/pages/transfer/result/confirmation']);
    const myPopup = window.open('#' + url.toString(), '_blank');
    //  periodical message sender
    setTimeout(() => {
      const message = { transfer, searchResult: this.searchResult, searchModel: this.searchModel };
      myPopup.postMessage(message, `${environment.front_url}`); // send the message and target URI
    }, 6000);
    // }
    // if (Number(transfer.pricing.price) > this.credits) {
    //   this.toast.warning(this.translate.instant('insufficient balance'));
    // }
  }

}
