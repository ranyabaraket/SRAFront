import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-hire-information',
  templateUrl: './car-hire-information.component.html',
  styleUrls: ['./car-hire-information.component.scss']
})
export class CarHireInformationComponent implements OnInit {
  @Input() data;
  @Input()  searchModel;
  constructor(public translate: TranslateService,
              private cookie: CookieService,
              private currencyPipe: CustomCurrencyPipe,
              private toast: ToastrService,
              private router: Router,
              private languageServise: LanguageService) { }

  ngOnInit(): void {

  }
  select(item) {
    if (this.cookie.get('canSelect') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    //  if (Number(transfer.pricing.price) <= this.credits) {
    const url = this.router.createUrlTree(['/pages/car-hire/result/confirmation']);
    const myPopup = window.open('#' + url.toString(), '_blank');
    //  periodical message sender
    setTimeout(() => {
      const message = {item , searchModel : this.searchModel };
      myPopup.postMessage(message, `${environment.front_url}`); // send the message and target URI
    }, 6000);
    // }
  }
  format(value){
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
}
