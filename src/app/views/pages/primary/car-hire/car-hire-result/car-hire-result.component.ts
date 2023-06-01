import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';

import { StoreFlightDataService } from '../../flight/store-flight-data.service';

@Component({
  selector: 'app-car-hire-result',
  templateUrl: './car-hire-result.component.html',
  styleUrls: ['./car-hire-result.component.scss']
})
export class CarHireResultComponent implements OnInit, OnDestroy {
  steps = [
    { name: 'Search', icon: 'fas fa-search', link: '/pages/car-hire', active: false, pass: true },
    { name: 'Selection', icon: 'fas fa-mouse-pointer', active: true, pass: false },
  //  { name: 'Passenger details', icon: 'fas fa-info-circle', active: false, pass: false },
    { name: 'Confirmation', icon: 'fas fa-check-circle', active: false, pass: false },
    { name: 'Voucher', icon: 'fas fa-info-circle', active: false, pass: false },

    // { name: 'Payment', icon: 'fas fa-wallet', active: false, pass: false }
  ];
  searchResult;
  i = 0;
  constructor(private route: ActivatedRoute,
              private storeFlightData: StoreFlightDataService,
              private cdRef: ChangeDetectorRef,
              private languageServise: LanguageService,
              public translate: TranslateService) { }
  ngOnDestroy(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
  }

  ngOnInit(): void {
    this.storeFlightData.getSteps().subscribe(
      data => {
        if (data) {
          for (let i = 0; i < this.steps.length; i++) {
            if (i !== data) {
              this.steps[i].active = false;
            } else {
              this.steps[i].active = true;
            }
          }
        }
      }
    );
    this.cdRef.detectChanges();
  }


}
