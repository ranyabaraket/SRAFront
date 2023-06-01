import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { InsuranceService } from '../insurance.service';

@Component({
  selector: 'app-insurance-result',
  templateUrl: './insurance-result.component.html',
  styleUrls: ['./insurance-result.component.scss']
})

export class InsuranceResultComponent implements OnInit, OnDestroy {

  steps = [
    { name: 'Search', icon: 'fas fa-search', link: '/pages/insurance', active: false, pass: true },
    { name: 'Selection', icon: 'fas fa-mouse-pointer', active: true, pass: false },
    // { name: 'Review', icon: 'fas fa-hotel', active: false, pass: false },
    // { name: 'Reservation details', icon: 'fas fa-info-circle', active: false, pass: false },
    { name: 'Confirmation', icon: 'fas fa-check-circle', active: false, pass: false },
    { name: 'Voucher', icon: 'fas fa-print', active: false, pass: false }
  ];
  constructor(
    private insuranceService: InsuranceService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cdRef: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.insuranceService.changeStep([0, 0]);
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.insuranceService.getSteps().subscribe(
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
    ),
    this.cdRef.detectChanges();
  }
}
