import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
  selector: 'app-insurance-history-details',
  templateUrl: './insurance-history-details.component.html',
  styleUrls: ['./insurance-history-details.component.scss']
})
export class InsuranceHistoryDetailsComponent implements OnInit {

  @Input() insuranceDetails;
  @Output() backward = new EventEmitter();
  tiersName: string;
  callCenter: string;
  adress: string;
  constructor(
    public languageServise: LanguageService,
    public translate: TranslateService,
    private cookie: CookieService,
    public router: Router) {

  }

  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.tiersName = this.cookie.get('tiersName');
    this.callCenter = this.cookie.get('callCenter');
    this.adress = this.cookie.get('address');
    if (!this.insuranceDetails.dtEndass) {
      this.insuranceDetails.dtEndass = this.insuranceDetails.dtStartass;
    }
  }

  back(): void {
    this.backward.emit(false);
  }

}
