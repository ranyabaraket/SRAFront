import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss']
})
export class InsuranceDetailsComponent implements OnInit {
  @Input() data;
  @Input() events: Observable<[]>;
  @Input() eventInitFilter: Observable<[]>;

  @Output() backward = new EventEmitter();

  insuranceRslt: any;
  datatoStore: any = {};
  private eventsSubscription: Subscription;
  passengerNbr = 0;
  searchModel: any;
  showPriceDetails: any = [];
  childNb = 0;
  adltNb = 0;
  infantNb = 0;
  amntAdl = [];
  amtChd = [];

  constructor(
    private router: Router,
    private cookie: CookieService,
    private toast: ToastrService,
    public translate: TranslateService,
    private currencyPipe: CustomCurrencyPipe
  ) { }

  ngOnInit(): void {
    this.insuranceRslt = this.data.insuranceRslt;
    this.eventsSubscription = this.events.subscribe((data) => {
      this.insuranceRslt = data;
    });
    this.eventsSubscription = this.eventInitFilter.subscribe((data) => {
      this.searchModel = JSON.parse(localStorage.getItem('searchModel'));
      this.passengerNbr = this.searchModel.totalAdults + this.searchModel.totalChild;
      this.insuranceRslt = data;
      this.showPriceDetails = [];
    });
    this.passengerNbr = this.data.searchModel.totalAdults + this.data.searchModel.totalChild;
  }

  confirmInsurance(item) {
    // if (this.cookie.get('canSelect') !== 'O') {
    //   this.toast.warning(this.translate.instant('Action not allowed'));
    //   return;
    // }
    this.datatoStore.selectedItem = item;
    this.datatoStore.searchModel = this.data.searchModel;
    localStorage.setItem('insuranceSelected', JSON.stringify(this.datatoStore));
    const url = this.router.createUrlTree(['/pages/insurance/result/confirmation']);
    window.open('#' + url.toString(), '_blank');
  }
  selectInsurance(item) {
    this.backward.emit(item);
  }

  openPriceBreakDown(item, index) {
    this.showPriceDetails[index] = !this.showPriceDetails[index];
    this.adltNb = this.data.searchModel.totalAdults;
    this.childNb = this.data.searchModel.totalChild;
    this.infantNb = this.data.searchModel.totalInfants;
    if (item.planPremiumChargeType === 'PerPassenger') {
      this.amntAdl[index] = item.premiumAmount * this.adltNb;
      this.amtChd[index] = item.premiumAmount * this.childNb;
    }

  }
  format(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
}
