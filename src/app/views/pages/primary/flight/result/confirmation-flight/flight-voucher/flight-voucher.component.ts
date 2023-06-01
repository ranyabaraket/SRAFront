import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { map } from 'rxjs/operators';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-flight-voucher',
  templateUrl: './flight-voucher.component.html',
  styleUrls: ['./flight-voucher.component.scss']
})
export class FlightVoucherComponent implements OnInit {
  tiersName;
  address;
  today = new Date();
  @Input() data: any;
  @Output() backward = new EventEmitter();
  constructor(public languageServise: LanguageService,
              public translate: TranslateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cookie: CookieService,
              private currencyPipe: CustomCurrencyPipe) { }

  ngOnInit(): void {
    this.tiersName = this.cookie.get('tiersName');
    this.address = this.cookie.get('address');
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.data) {
        this.data = res.data;
      }
      else {
        this.router.navigate(['/pages/flight']);
      }
    });
  }
  format(value){
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
   }
   cancel(){
    this.backward.emit(false);
  }
  getSrcImg(codeCom) {
    return 'https://worldsoftgroup.com/airelines/' + codeCom + '.png';
  }
}
