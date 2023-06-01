import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-result-hotel-search',
  templateUrl: './result-hotel-search.component.html',
  styleUrls: ['./result-hotel-search.component.scss']
})
export class ResultHotelSearchComponent implements OnInit, OnDestroy{
  steps = [
    { name: 'Search', icon: 'fas fa-search', link: '/pages/home', active: false, pass: true },
    { name: 'Selection', icon: 'fas fa-mouse-pointer', active: true, pass: false },
    { name: 'Rooms details', icon: 'fas fa-hotel', active: false, pass: false },
    { name: 'Passenger details', icon: 'fas fa-list', active: false, pass: false },
    { name: 'Confirmation', icon: 'fas fa-check-circle', active: false, pass: false },
    { name: 'Voucher', icon: 'fas fa-info-circle', active: false, pass: false }
  ];
  constructor(
    private hotelService: HotelService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cdRef: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.hotelService.changeStep([0, 0]);
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.hotelService.getSteps().subscribe(
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
